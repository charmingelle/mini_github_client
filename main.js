/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["clean"] = clean;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_FirstScreen__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_CardsList__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_SortingPanel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_FilterPanel__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(7);








function clean(domElement) {
  while (domElement.firstChild) {
    domElement.removeChild(domElement.firstChild);
  }
}

const sortOrderCorrespondence = {
  ascending: 1,
  descending: -1
};

const buttonHandlerCorrespondence = {
  'repo-name-sort': __WEBPACK_IMPORTED_MODULE_5__utils__["k" /* sortByRepoName */],
  'stars-count-sort': __WEBPACK_IMPORTED_MODULE_5__utils__["l" /* sortByStarsCount */],
  'open-issues-sort': __WEBPACK_IMPORTED_MODULE_5__utils__["j" /* sortByOpenIssuesCount */],
  'update-date-sort': __WEBPACK_IMPORTED_MODULE_5__utils__["m" /* sortByUpdatedDate */]
};

class App {
  constructor() {
    this.appWasStarted = false;
    this.owner = '';
    this.reposTotal = 0;
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.firstScreen = new __WEBPACK_IMPORTED_MODULE_0__views_FirstScreen__["a" /* default */](this.onSubmitClick);
    this.cardsData = [];
    this.cardsList = new __WEBPACK_IMPORTED_MODULE_1__views_CardsList__["a" /* default */]();
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
    this.sortingPanel = new __WEBPACK_IMPORTED_MODULE_2__views_SortingPanel__["a" /* default */](this.onSortPanelChange);

    this.onFilterPanelChange = this.onFilterPanelChange.bind(this);
    this.filterPanel = new __WEBPACK_IMPORTED_MODULE_3__views_FilterPanel__["a" /* default */](
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
    const url = `users/${owner}/repos?page=${Object(__WEBPACK_IMPORTED_MODULE_5__utils__["h" /* getPageNumber */])(
      this.cardsData.length
    )}`;

    return Object(__WEBPACK_IMPORTED_MODULE_4__api_js__["a" /* get */])(url, {
      Accept: 'application/vnd.github.mercy-preview+json'
    }).then(this.passData, this.catchError);
  }

  getNumberOfRepos(owner) {
    return Object(__WEBPACK_IMPORTED_MODULE_4__api_js__["a" /* get */])(`users/${owner}`).then(function(data) {
      return data.public_repos;
    }, this.catchError);
  }

  drawLoader() {
    clean(this.mainScreen);
    this.mainScreen.innerText = 'Loading...';
  }

  loadNewCards() {
    if (Object(__WEBPACK_IMPORTED_MODULE_5__utils__["i" /* isScrolledToBottom */])()) {
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
      filteredCardsData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["b" /* filterByPresentOpenIssues */])(filteredCardsData);
    }

    if (this.filterState.hasTopics) {
      filteredCardsData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["c" /* filterByPresentTopics */])(filteredCardsData);
    }

    if (this.filterState.starred > 0) {
      filteredCardsData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["d" /* filterByStarred */])(
        filteredCardsData,
        this.filterState.starred
      );
    }

    if (this.filterState.date) {
      filteredCardsData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* filterByUpdatedAfter */])(
        filteredCardsData,
        this.filterState.date
      );
    }

    if (this.filterState.type === 'forks') {
      filteredCardsData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["f" /* filterForks */])(filteredCardsData);
    }

    if (this.filterState.type === 'sources') {
      filteredCardsData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["g" /* filterSources */])(filteredCardsData);
    }

    if (this.filterState.language !== 'All languages') {
      filteredCardsData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* filterByLanguage */])(
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = get;
const BASE_PATH = 'https://api.github.com/';

function get(path, headers = {}) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status > 200) {
          reject(xhr, xhr.status);
        } else {
          resolve(JSON.parse(xhr.responseText));
        }
      }
    };

    xhr.open('GET', `${BASE_PATH}${path}`);

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.send();
  });
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FirstScreen {
  constructor(onSubmit) {
    this._firstScreen = document.createElement('div');

    let input = document.createElement('input');
    let submit = document.createElement('button');

    this._firstScreen.id = 'first-screen-container';
    input.id = 'user-or-org-name-input';
    input.type = 'text';
    input.placeholder = 'Enter user name here';
    submit.id = 'submit-button';
    submit.innerHTML = 'Submit';

    submit.addEventListener('click', function() {
      onSubmit(input.value);
    });

    this._firstScreen.appendChild(input);
    this._firstScreen.appendChild(submit);
  }

  get domElement() {
    return this._firstScreen;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FirstScreen;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ModalWindow__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(0);




const monthNamesShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

class Card {
  constructor(item, index) {
    this.repoName = item.name;
    this.url = item.svn_url;
    this.description = item.description;
    this.isFork = item.fork;
    this.language = item.language;
    this.starsCount = item.stargazers_count;
    this.date = item.updated_at;
    this.owner = item.owner;
    this.openIssuesCount = item.open_issues_count;
    this.topics = item.topics;
    this.index = index;
  }

  get domElement() {
    let cardDomElement = document.createElement('div');

    cardDomElement.classList.add('card');
    cardDomElement.id = this.index;
    cardDomElement.classList.add('card');

    let nameForkContainer = document.createElement('div');
    nameForkContainer.classList.add('card-name-fork-container');

    let repoName = document.createElement('a');
    repoName.innerText = this.repoName;
    repoName.href = this.url;
    repoName.classList.add('card-repo-name');

    nameForkContainer.appendChild(repoName);

    //TODO: Replace with true/false flag
    if (this.isFork) {
      nameForkContainer.appendChild(this.createCardForkedRepo());
    }
    cardDomElement.appendChild(nameForkContainer);

    if (this.description !== null) {
      cardDomElement.appendChild(this.createCardDescription());
    }

    if (this.language !== null) {
      cardDomElement.appendChild(this.createCardLanguage());
    }

    let inlineGroup = document.createElement('div');
    inlineGroup.classList.add('card-inline-group');

    if (this.starsCount !== 0) {
      inlineGroup.appendChild(this.createStarsCounter());
    }

    let updatedDate = this.getCardDate();
    inlineGroup.appendChild(updatedDate);

    cardDomElement.appendChild(inlineGroup);
    return cardDomElement;
  }

  getCardDate() {
    let date = '';

    let cardUpdatedDate = document.createElement('div');

    let curDate = new Date();
    let dayDiff = Math.floor((curDate - this.date) / 86400000);

    if (dayDiff === 0) {
      date = 'Updated today';
    } else if (dayDiff === 1) {
      date = 'Updated yesterday';
    } else if (dayDiff <= 31) {
      date = `Updated ${dayDiff} days ago`;
    } else {
      let shortMonth = monthNamesShort[this.date.getMonth()];

      date = `Updated on ${shortMonth} ${this.date.getDate()}`;

      if (this.date.getFullYear() != curDate.getFullYear()) {
        date += `, ${this.date.getFullYear()}`;
      }
    }

    cardUpdatedDate.innerText = date;
    cardUpdatedDate.classList.add('card-update-date');

    return cardUpdatedDate;
  }

  createCardDescription() {
    let description = document.createElement('div');

    description.innerHTML = this.description;
    description.classList.add('card-description');

    return description;
  }

  createCardLanguage() {
    let language = document.createElement('div');

    language.innerHTML = this.language;
    language.classList.add('card-language');

    return language;
  }

  createCardForkedRepo() {
    let forked = document.createElement('div');

    forked.innerHTML = 'This repo is a fork';
    forked.classList.add('card-is-repo-a-fork');

    return forked;
  }

  createStarsCounter() {
    let counter = document.createElement('div');

    counter.innerHTML = `&#9733; ${this.starsCount}`;
    counter.classList.add('card-stars-count');

    return counter;
  }
}

class CardsList {
  constructor() {
    this.cards = [];
    this._domElement = this.createCardsListDomElement();

    this.addCards = this.addCards.bind(this);
    this._domElement.addEventListener('click', this.handleCardClick.bind(this));
  }

  get domElement() {
    return this._domElement;
  }

  addCards(cardsData) {
    this.cards = cardsData.map(function(data, index) {
      return new Card(data, index);
    });
    Object(__WEBPACK_IMPORTED_MODULE_1__app__["clean"])(this._domElement);
    this.draw();
  }

  handleCardClick(event) {
    const card = event.target.closest('.card');

    if (card) {
      new __WEBPACK_IMPORTED_MODULE_0__ModalWindow__["a" /* default */](this.cards[+card.id]).draw();
    }
  }

  createCardsListDomElement() {
    let cardContainer = document.createElement('div');
    cardContainer.id = 'card-container';

    return cardContainer;
  }

  draw() {
    let cardsBlockWrapper = document.createElement('div');
    cardsBlockWrapper.classList.add('cards-block-wrapper');

    this.cards.forEach(function(card) {
      cardsBlockWrapper.appendChild(card.domElement);
    });
    this._domElement.appendChild(cardsBlockWrapper);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CardsList;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(0);



const bytesToKb = bytes => Math.round(bytes / 125);

class ModalWindow {
  constructor(cardData) {
    // TODO: Look here - named destructuring
    const { owner, repoName, isFork } = cardData;

    this.mainScreen = document.getElementById('main-screen');
    this.overlay = document.createElement('div');
    this.overlay.id = 'overlay';

    this.isWithData = false;

    this.window = document.createElement('div');
    this.window.id = 'card-details-window';
    this.window.innerHTML = '<span>Loading...</span>';

    let requests = [
      this.getContributors(owner, repoName),
      this.getLanguages(owner, repoName),
      this.getPullRequests(owner, repoName)
    ];

    if (isFork) {
      requests.push(this.getForkedFrom(owner, repoName));
    }

    Promise.all(requests).then(gitHubData => {
      // TODO: Look here - array function in callback for avoiding of using .bind(this)
      this.isWithData = true;
      this.initModalWindow(gitHubData, cardData);
    });

    this.close = this.close.bind(this);
    this.overlay.addEventListener('click', this.close);
  }

  initModalWindow(data, cardData) {
    // TODO: Look here - destructuring of array and object
    const [contributors, languages, pullRequests, forkedFrom] = data;
    const { repoName, url } = cardData;

    const heading = this.getHeading(repoName, url, forkedFrom);
    const contributorsContainer = this.getContributorsContainer(contributors);
    const languagesContainer = this.getLanguagesContainer(languages);
    const prsContainer = this.getPrsContainer(pullRequests);

    Object(__WEBPACK_IMPORTED_MODULE_1__app__["clean"])(this.window);

    this.window.appendChild(
      this.getWindowContent(
        heading,
        contributorsContainer,
        languagesContainer,
        prsContainer
      )
    );
  }

  getHeading(repoName, url, forkedFrom) {
    let heading = document.createElement('div');
    let repoNameLink = document.createElement('a');

    heading.id = 'heading';
    repoNameLink.id = 'repo-name-link';
    repoNameLink.innerHTML = repoName;
    repoNameLink.href = url;
    heading.appendChild(repoNameLink);
    if (forkedFrom) {
      let source = document.createElement('p');

      source.id = 'source';
      source.innerHTML = `Forked from <a href = 'https://github.com/${forkedFrom}'>${forkedFrom}</a>`;
      heading.appendChild(source);
    }
    return heading;
  }

  getContributorsContainer(contributors) {
    let contributorsContainer = document.createElement('div');
    let contributorsHeading = document.createElement('h2');
    let contributorsTable = document.createElement('table');

    contributorsContainer.classList.add('block-container');
    contributorsHeading.classList.add('block-container-heading');
    contributorsHeading.innerHTML = 'Contributors';
    contributorsTable.innerHTML =
      '<thead><td>Username</td><td>Contributions</td></thead>';

    contributors.forEach(function(item) {
      let tr = document.createElement('tr');
      let tdWithName = document.createElement('td');
      let tdWithContributions = document.createElement('td');

      tdWithName.innerHTML = `<a href = '${item.html_url}'>${item.login}</a>`;
      tdWithContributions.innerHTML = item.contributions;
      tdWithContributions.classList.add('number-of-prs');
      tr.appendChild(tdWithName);
      tr.appendChild(tdWithContributions);
      contributorsTable.appendChild(tr);
    });

    contributorsContainer.appendChild(contributorsHeading);
    contributorsContainer.appendChild(contributorsTable);

    return contributorsContainer;
  }

  getLanguagesContainer(languages) {
    let languagesContainer = document.createElement('div');
    let languagesHeading = document.createElement('h2');
    let languagesTable = document.createElement('table');

    languagesContainer.classList.add('block-container');
    languagesHeading.classList.add('block-container-heading');
    languagesHeading.innerHTML = 'Languages';
    languagesTable.innerHTML = '<thead><td>Language</td><td>Kb</td></thead>';

    for (var key in languages) {
      if (!languages.hasOwnProperty(key)) {
        return;
      }

      let tr = document.createElement('tr');
      let tdWithLanguage = document.createElement('td');
      let tdWithKb = document.createElement('td');

      tdWithLanguage.innerHTML = key;
      tdWithKb.innerHTML = languages[key];
      tdWithKb.classList.add('amount-of-kbs');
      tr.appendChild(tdWithLanguage);
      tr.appendChild(tdWithKb);
      languagesTable.appendChild(tr);
    }

    languagesContainer.appendChild(languagesHeading);
    languagesContainer.appendChild(languagesTable);

    return languagesContainer;
  }

  getPrsContainer(prs) {
    let prsContainer = document.createElement('div');
    let prsHeading = document.createElement('h2');
    let prsList = document.createElement('ul');

    prsContainer.classList.add('block-container');
    prsHeading.classList.add('block-container-heading');
    prsHeading.innerHTML = 'Pull&#160;Requests';

    prs.forEach(function(item) {
      let li = document.createElement('li');

      li.innerHTML = `<a href = '${item.html_url}'>${item.title}</a>`;
      prsList.appendChild(li);
    });

    prsContainer.appendChild(prsHeading);
    prsContainer.appendChild(prsList);

    return prsContainer;
  }

  getOkButton() {
    let okButton = document.createElement('button');

    okButton.id = 'ok-button';
    okButton.innerHTML = 'OK';
    okButton.addEventListener('click', this.close);
    return okButton;
  }

  getWindowContent(
    heading,
    contributorsContainer,
    languagesContainer,
    prsContainer
  ) {
    let innerWrapper = document.createElement('div');
    let contentContainer = document.createElement('div');
    let okButton = this.getOkButton();

    innerWrapper.id = 'card-details-wrapper';
    contentContainer.id = 'content-container';
    contentContainer.appendChild(contributorsContainer);
    contentContainer.appendChild(languagesContainer);
    contentContainer.appendChild(prsContainer);
    innerWrapper.appendChild(heading);
    innerWrapper.appendChild(contentContainer);
    innerWrapper.appendChild(okButton);

    return innerWrapper;
  }

  getForkedFrom(owner, repoName) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* get */])(`repos/${owner.login}/${repoName}`).then(function(data) {
      return data.parent.full_name;
    });
  }

  getContributors(owner, repoName) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* get */])(`repos/${owner.login}/${repoName}/contributors`).then(
      function(data) {
        let contributors = data.map(({ login, html_url, contributions }) => ({
          login,
          html_url,
          contributions
        }));
        return contributors.splice(0, 3);
      },
      function(error) {
        alert(error.message);
      }
    );
  }

  getLanguages(owner, repoName) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* get */])(`repos/${owner.login}/${repoName}/languages`).then(
      function(languages) {
        return Object.keys(languages).reduce((acc, title) => {
          const langSize = bytesToKb(languages[title]);

          if (langSize > 1) {
            acc[title] = langSize;
          }

          return acc;
        }, {});
      },
      function(error) {
        alert(error.message);
      }
    );
  }

  getPullRequests(owner, repoName) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* get */])(`repos/${owner.login}/${repoName}/pulls?sort=popularity`).then(
      function(data) {
        let prs = data.map(({ title, html_url }) => ({
          title,
          html_url
        }));
        return prs.splice(0, 5);
      },
      function(error) {
        alert(error.message);
      }
    );
  }

  draw() {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
    this.mainScreen.appendChild(this.overlay);
    this.mainScreen.appendChild(this.window);
  }

  close() {
    this.mainScreen.removeChild(this.overlay);
    this.mainScreen.removeChild(this.window);
    document.getElementsByTagName('body')[0].classList.remove('no-scroll');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModalWindow;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SortingPanel {
  constructor(onChange) {
    this._sortingPanel = document.createElement('div');

    let repoNameButton = this.getButton('repo-name-sort', 'Sort by repo name');
    let starsCountButton = this.getButton(
      'stars-count-sort',
      'Sort by stars count'
    );
    let openIssuesCountButton = this.getButton(
      'open-issues-sort',
      'Sort by open issues count'
    );
    let updatedDateButton = this.getButton(
      'update-date-sort',
      'Sort by updated date'
    );

    const buttons = [
      repoNameButton,
      starsCountButton,
      openIssuesCountButton,
      updatedDateButton
    ];

    this._sortingPanel.id = 'sorting-panel';
    this._sortingPanel.appendChild(repoNameButton);
    this._sortingPanel.appendChild(starsCountButton);
    this._sortingPanel.appendChild(openIssuesCountButton);
    this._sortingPanel.appendChild(updatedDateButton);
    this._sortingPanel.addEventListener('click', event => {
      let target = event.target.closest('.sort');
      if (target) {
        onChange({
          button: target.id,
          order: target.getAttribute('data-order')
        });
        buttons.forEach(function(button) {
          button.childNodes[1].setAttribute('click-status', 'free');
        });
        target.childNodes[1].setAttribute('click-status', 'clicked');
        // Add hiding the arrow to styles
        if (target.getAttribute('data-order') === 'descending') {
          target.setAttribute('data-order', 'ascending');
          target.childNodes[1].innerHTML = '&#8593;';
        } else {
          target.setAttribute('data-order', 'descending');
          target.childNodes[1].innerHTML = '&#8595;';
        }
      }
    });
  }

  getButton(id, innerHTML) {
    let button = document.createElement('button');

    button.id = id;
    button.innerHTML = innerHTML;
    button.classList.add('sort');
    button.setAttribute('data-order', 'ascending');

    let arrow = document.createElement('span');

    button.appendChild(arrow);
    return button;
  }

  get domElement() {
    return this._sortingPanel;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SortingPanel;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FilterPanel {
  constructor(onChange, languages) {
    this._filterPanel = document.createElement('div');
    this._languageDropdown = document.createElement('select');

    let hasOpenIssuesContainer = document.createElement('div');
    let hasOpenIssuesLabel = document.createElement('label');
    let hasOpenIssuesCheckbox = document.createElement('input');
    let topicsContainer = document.createElement('div');
    let topicsLabel = document.createElement('label');
    let topicsCheckbox = document.createElement('input');
    let starContainer = document.createElement('div');
    let starLabel = document.createElement('label');
    let starInput = document.createElement('input');
    let calendarContainer = document.createElement('div');
    let calendarLabel = document.createElement('label');
    let calendar = document.createElement('input');
    let typeDropdown = document.createElement('select');
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    let option3 = document.createElement('option');
    let applyButton = document.createElement('button');

    this._filterPanel.id = 'filter-panel';
    hasOpenIssuesLabel.innerHTML = 'Has open issues';
    hasOpenIssuesCheckbox.type = 'checkbox';
    hasOpenIssuesContainer.appendChild(hasOpenIssuesLabel);
    hasOpenIssuesContainer.appendChild(hasOpenIssuesCheckbox);
    topicsLabel.innerHTML = 'Has topics';
    topicsCheckbox.type = 'checkbox';
    topicsContainer.appendChild(topicsLabel);
    topicsContainer.appendChild(topicsCheckbox);
    starLabel.innerHTML = 'Starred';
    starInput.type = 'number';
    starInput.value = '0';
    starInput.min = '0';
    starContainer.appendChild(starLabel);
    starContainer.appendChild(starInput);
    calendarLabel.innerHTML = 'Updated after';
    calendar.type = 'date';
    calendarContainer.appendChild(calendarLabel);
    calendarContainer.appendChild(calendar);
    typeDropdown.size = '1';
    option1.innerHTML = 'all';
    option2.innerHTML = 'forks';
    option3.innerHTML = 'sources';
    this.drawLanguages(languages);
    applyButton.innerHTML = 'Apply filters';

    applyButton.addEventListener('click', () => {
      let filterStates = {};

      filterStates.hasOpenIssues = hasOpenIssuesCheckbox.checked;
      filterStates.hasTopics = topicsCheckbox.checked;
      filterStates.starred = starInput.value;

      if (calendar.value !== '') {
        filterStates.date = new Date(Date.parse(calendar.value));
      }

      filterStates.type =
        typeDropdown.options[typeDropdown.selectedIndex].innerHTML;
      filterStates.language = this._languageDropdown.options[
        this._languageDropdown.selectedIndex
      ].innerHTML;

      onChange(filterStates);
    });

    typeDropdown.appendChild(option1);
    typeDropdown.appendChild(option2);
    typeDropdown.appendChild(option3);
    this._filterPanel.appendChild(hasOpenIssuesContainer);
    this._filterPanel.appendChild(topicsContainer);
    this._filterPanel.appendChild(starContainer);
    this._filterPanel.appendChild(calendarContainer);
    this._filterPanel.appendChild(typeDropdown);
    this._filterPanel.appendChild(this._languageDropdown);
    this._filterPanel.appendChild(applyButton);

    this.drawLanguages = this.drawLanguages.bind(this);
  }

  get domElement() {
    return this._filterPanel;
  }

  drawLanguages(languages) {
    while (this._languageDropdown.firstChild) {
      this._languageDropdown.removeChild(this._languageDropdown.firstChild);
    }
    languages.forEach(element => {
      let option = document.createElement('option');
      option.innerHTML = element;
      this._languageDropdown.appendChild(option);
    });
  }

  redrawLanguages(languages) {
    let value = this._languageDropdown.options[
      this._languageDropdown.selectedIndex
    ].innerHTML;

    this.drawLanguages(languages);
    if (this.findSelectedValue(value) !== -1) {
      this._languageDropdown.selectedIndex = this.findSelectedValue(value);
    } else {
      this._languageDropdown.selectedIndex = 0;
    }
  }

  findSelectedValue(value) {
    for (let i = 0; i < this._languageDropdown.length; i++) {
      if (this._languageDropdown.options[i].innerHTML === value) {
        return i;
      }
    }
    return -1;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FilterPanel;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = getPageNumber;
/* harmony export (immutable) */ __webpack_exports__["i"] = isScrolledToBottom;
/* harmony export (immutable) */ __webpack_exports__["k"] = sortByRepoName;
/* harmony export (immutable) */ __webpack_exports__["l"] = sortByStarsCount;
/* harmony export (immutable) */ __webpack_exports__["j"] = sortByOpenIssuesCount;
/* harmony export (immutable) */ __webpack_exports__["m"] = sortByUpdatedDate;
/* harmony export (immutable) */ __webpack_exports__["b"] = filterByPresentOpenIssues;
/* harmony export (immutable) */ __webpack_exports__["c"] = filterByPresentTopics;
/* harmony export (immutable) */ __webpack_exports__["d"] = filterByStarred;
/* harmony export (immutable) */ __webpack_exports__["e"] = filterByUpdatedAfter;
/* harmony export (immutable) */ __webpack_exports__["f"] = filterForks;
/* harmony export (immutable) */ __webpack_exports__["g"] = filterSources;
/* harmony export (immutable) */ __webpack_exports__["a"] = filterByLanguage;
function getPageNumber(reposAmount) {
  const MAX_REPOS_ON_PAGE = 30;

  return reposAmount / MAX_REPOS_ON_PAGE + 1;
}

function isScrolledToBottom() {
  return (
    window.innerHeight + document.body.scrollTop + 1 >=
    document.body.scrollHeight
  );
}

function sortByRepoName(arr, order) {
  arr.sort(function(a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return order;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -order;
  });
}

function sortByStarsCount(arr, order) {
  arr.sort(function(a, b) {
    if (a.stargazers_count > b.stargazers_count) return order;
    if (a.stargazers_count < b.stargazers_count) return -order;
  });
}

function sortByOpenIssuesCount(arr, order) {
  arr.sort(function(a, b) {
    if (a.open_issues_count > b.open_issues_count) return order;
    if (a.open_issues_count < b.open_issues_count) return -order;
  });
}

function sortByUpdatedDate(arr, order) {
  arr.sort(function(a, b) {
    if (a.updated_at > b.updated_at) return order;
    if (a.updated_at < b.updated_at) return -order;
  });
}

function filterByPresentOpenIssues(arr) {
  return arr.filter(function(element) {
    return element.open_issues_count > 0;
  });
}

function filterByPresentTopics(arr) {
  return arr.filter(function(element) {
    return Array.isArray(element.topics) && element.topics.length;
  });
}

function filterByStarred(arr, times) {
  return arr.filter(function(element) {
    return element.stargazers_count >= times;
  });
}

function filterByUpdatedAfter(arr, date) {
  return arr.filter(function(element) {
    return element.updated_at - date > 0;
  });
}

function filterForks(arr) {
  return arr.filter(function(element) {
    return element.fork === true;
  });
}

function filterSources(arr) {
  return arr.filter(function(element) {
    return element.fork === false;
  });
}

function filterByLanguage(arr, language) {
  return arr.filter(function(element) {
    return element.language == language;
  });
}


/***/ })
/******/ ]);