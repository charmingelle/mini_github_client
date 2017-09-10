import ModalWindow from './ModalWindow';

import { clean } from '../app';

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

export default class CardsList {
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
    clean(this._domElement);
    this.draw();
  }

  handleCardClick(event) {
    const card = event.target.closest('.card');

    if (card) {
      new ModalWindow(this.cards[+card.id]).draw();
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
