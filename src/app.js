import FirstScreen from './views/FirstScreen';
import CardsList from './views/CardsList';
import SortingPanel from './views/SortingPanel';
import FilterPanel from './views/FilterPanel';

import { get } from './api.js';
import {
  getPageNumber,
  isScrolledToBottom,
  sortByRepoName,
  sortByStarsCount,
  sortByOpenIssuesCount,
  sortByUpdatedDate,
  filterByPresentOpenIssues,
  filterByPresentTopics,
  filterByStarred,
  filterByUpdatedAfter,
  filterForks,
  filterSources,
  filterByLanguage
} from './utils';

export function clean(domElement) {
  while (domElement.firstChild) {
    domElement.removeChild(domElement.firstChild);
  }
}

const sortOrderCorrespondence = {
  ascending: 1,
  descending: -1
};

const buttonHandlerCorrespondence = {
  'repo-name-sort': sortByRepoName,
  'stars-count-sort': sortByStarsCount,
  'open-issues-sort': sortByOpenIssuesCount,
  'update-date-sort': sortByUpdatedDate
};

class App {
  constructor() {
    this.appWasStarted = false;
    this.owner = '';
    this.reposTotal = 0;
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.firstScreen = new FirstScreen(this.onSubmitClick);
    this.cardsData = [];
    this.cardsList = new CardsList();
    this.isLoading = false;
    this.languages = [];
    this.sortState = {
      button: 'repo-name-sort',
      order: 'ascending'
    };
    this.filterState = {
      hasOpenIssues: false,
      hasTopics: false,
      starred: 0,
      date: '',
      type: 'all',
      language: 'All languages'
    };

    this.mainScreen = document.getElementById('main-screen');

    this.initAppWithData = this.initAppWithData.bind(this);
    // this.returnLoadedData = this.returnLoadedData.bind(this);
    this.addCardsData = this.addCardsData.bind(this);
    this.loadNewCards = this.loadNewCards.bind(this);
    this.sortCardsData = this.sortCardsData.bind(this);
    this.filterCardsData = this.filterCardsData.bind(this);
    this.passData = this.passData.bind(this);
    this.catchError = this.catchError.bind(this);

    window.addEventListener('scroll', this.loadNewCards);

    this.onSortPanelChange = this.onSortPanelChange.bind(this);
    this.sortingPanel = new SortingPanel(this.onSortPanelChange);

    this.onFilterPanelChange = this.onFilterPanelChange.bind(this);
    this.filterPanel = new FilterPanel(
      this.onFilterPanelChange,
      this.languages
    );
  }

  getLanguages(cardsData) {
    return cardsData.reduce(
      function(languages, element) {
        if (
          element.language !== null &&
          !languages.includes(element.language)
        ) {
          languages.push(element.language);
        }
        return languages;
      },
      ['All languages']
    );
  }

  saveDatesInDateFormat(data) {
    data.forEach(function(element) {
      element.updated_at = new Date(element.updated_at);
    });
  }

  passData(data) {
    this.isLoading = false;
    return data;
  }

  catchError(error) {
    this.isLoading = false;
    alert(error.message);
  }

  getCardsData(owner) {
    this.isLoading = true;
    const url = `users/${owner}/repos?page=${getPageNumber(
      this.cardsData.length
    )}`;

    return get(url, {
      Accept: 'application/vnd.github.mercy-preview+json'
    }).then(this.passData, this.catchError);
  }

  getNumberOfRepos(owner) {
    return get(`users/${owner}`).then(function(data) {
      return data.public_repos;
    }, this.catchError);
  }

  drawLoader() {
    clean(this.mainScreen);
    this.mainScreen.innerText = 'Loading...';
  }

  loadNewCards() {
    if (isScrolledToBottom()) {
      let isAvailbaleRepos = this.cardsData.length < this.reposTotal;

      if (isAvailbaleRepos) {
        if (!this.isLoading) {
          this.getCardsData(this.owner).then(data => {
            this.addCardsData(data);
            this.cardsList.addCards(this.sortCardsData(this.filterCardsData()));
          });
        }
      } else {
        window.removeEventListener('scroll', this.loadNewCards);
      }
    }
  }

  onSubmitClick(owner) {
    this.drawLoader();
    this.owner = owner;
    Promise.all([this.getCardsData(owner), this.getNumberOfRepos(owner)]).then(
      this.initAppWithData
    );
  }

  addCardsData(newCardsData) {
    this.saveDatesInDateFormat(newCardsData);
    this.cardsData = this.cardsData.concat(newCardsData);
  }

  initAppWithData(data) {
    let [cardsData, reposTotal] = data;

    this.saveDatesInDateFormat(cardsData);
    this.cardsData = cardsData;
    this.reposTotal = reposTotal;
    this.appWasStarted = true;
    this.cardsList.addCards(this.cardsData);
    this.languages = this.getLanguages(this.cardsData);
    this.filterPanel.drawLanguages(this.languages);
    this.draw();
  }

  draw() {
    clean(this.mainScreen);

    if (!this.appWasStarted) {
      this.mainScreen.appendChild(this.firstScreen.domElement);
    } else {
      this.mainScreen.appendChild(this.filterPanel.domElement);
      this.mainScreen.appendChild(this.sortingPanel.domElement);
      this.mainScreen.appendChild(this.cardsList.domElement);
    }
  }

  onSortPanelChange(sortState) {
    this.sortState = sortState;

    this.cardsList.addCards(this.sortCardsData(this.filterCardsData()));
  }

  sortCardsData(data) {
    let sortedCardsData = data.slice(); // Copied the array

    buttonHandlerCorrespondence[this.sortState.button](
      sortedCardsData,
      sortOrderCorrespondence[this.sortState.order]
    );
    return sortedCardsData;
  }

  onFilterPanelChange(filterState) {
    this.filterState = filterState;

    this.cardsList.addCards(this.sortCardsData(this.filterCardsData()));
  }

  filterCardsData() {
    let filteredCardsData = this.cardsData;

    if (this.filterState.hasOpenIssues) {
      filteredCardsData = filterByPresentOpenIssues(filteredCardsData);
    }

    if (this.filterState.hasTopics) {
      filteredCardsData = filterByPresentTopics(filteredCardsData);
    }

    if (this.filterState.starred > 0) {
      filteredCardsData = filterByStarred(
        filteredCardsData,
        this.filterState.starred
      );
    }

    if (this.filterState.date) {
      filteredCardsData = filterByUpdatedAfter(
        filteredCardsData,
        this.filterState.date
      );
    }

    if (this.filterState.type === 'forks') {
      filteredCardsData = filterForks(filteredCardsData);
    }

    if (this.filterState.type === 'sources') {
      filteredCardsData = filterSources(filteredCardsData);
    }

    if (this.filterState.language !== 'All languages') {
      filteredCardsData = filterByLanguage(
        filteredCardsData,
        this.filterState.language
      );
    }
    this.languages = this.getLanguages(filteredCardsData);
    this.filterPanel.redrawLanguages(this.languages);
    return filteredCardsData;
  }
}

const app = new App();
app.draw();
