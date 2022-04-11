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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  /* harmony export (immutable) */ __webpack_exports__["d"] = filterArrayByState;
  /* unused harmony export filterByStars */
  /* harmony export (immutable) */ __webpack_exports__["e"] = getPageNumber;
  /* harmony export (immutable) */ __webpack_exports__["f"] = isScrolledToBottom;
  /* harmony export (immutable) */ __webpack_exports__["a"] = appendChildren;
  /* harmony export (immutable) */ __webpack_exports__["c"] = clean;
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_SortingPanel__ = __webpack_require__(1);
  
  
  const cardSorters = {
    [__WEBPACK_IMPORTED_MODULE_0__components_SortingPanel__["b" /* REPO_NAME_SORT */]]: createSorter('name'),
    [__WEBPACK_IMPORTED_MODULE_0__components_SortingPanel__["c" /* STARS_COUNT_SORT */]]: createSorter('stargazers_count'),
    [__WEBPACK_IMPORTED_MODULE_0__components_SortingPanel__["a" /* OPEN_ISSUES_SORT */]]: createSorter('open_issues_count'),
    [__WEBPACK_IMPORTED_MODULE_0__components_SortingPanel__["d" /* UPDATE_DATE_SORT */]]: createSorter('updated_at')
  };
  /* harmony export (immutable) */ __webpack_exports__["b"] = cardSorters;
  
  
  /* This function is for creating any sorting function, 
  which uses the order defined by key */
  function createSorter(key) {
    return function(array, order) {
      array.sort((a, b) => {
        if (a[key] > b[key]) return order;
        if (a[key] < b[key]) return -order;
      });
    };
  }
  
  function filterArrayByState(array, filterState) {
    return filterFunctions.reduce(
      (resultArray, filterFunction) => filterFunction(resultArray, filterState),
      array
    );
  }
  
  const filterFunctions = [
    filterByIssues,
    filterByTopics,
    filterByStars,
    filterByDate,
    filterByType,
    filterByLanguage
  ];
  
  function filterByIssues(array, filterState) {
    if (filterState.hasOpenIssues) {
      return array.filter(element => element.open_issues_count > 0);
    }
    return array;
  }
  
  function filterByTopics(array, filterState) {
    if (filterState.hasTopics) {
      return array.filter(
        element => Array.isArray(element.topics) && element.topics.length
      );
    }
    return array;
  }
  
  function filterByStars(array, filterState) {
    if (filterState.starred > 0) {
      return array.filter(
        element => element.stargazers_count >= filterState.starred
      );
    }
    return array;
  }
  
  function filterByDate(array, filterState) {
    if (filterState.date) {
      return array.filter(element => element.updated_at - filterState.date > 0);
    }
    return array;
  }
  
  function filterByType(array, filterState) {
    if (filterState.type === 'forks') {
      return array.filter(element => element.fork === true);
    }
    if (filterState.type === 'sources') {
      return array.filter(element => element.fork === false);
    }
    return array;
  }
  
  function filterByLanguage(array, filterState) {
    if (filterState.language !== 'All languages') {
      return array.filter(element => element.language === filterState.language);
    }
    return array;
  }
  
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
  
  function appendChildren(target, children) {
    children.forEach(child => target.appendChild(child));
  }
  
  function clean(domElement) {
    while (domElement.firstChild) {
      domElement.removeChild(domElement.firstChild);
    }
  }
  
  
  /***/ }),
  /* 1 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
  
  
  const REPO_NAME_SORT = 'repo-name-sort';
  /* harmony export (immutable) */ __webpack_exports__["b"] = REPO_NAME_SORT;
  
  const STARS_COUNT_SORT = 'stars-count-sort';
  /* harmony export (immutable) */ __webpack_exports__["c"] = STARS_COUNT_SORT;
  
  const OPEN_ISSUES_SORT = 'open-issues-sort';
  /* harmony export (immutable) */ __webpack_exports__["a"] = OPEN_ISSUES_SORT;
  
  const UPDATE_DATE_SORT = 'update-date-sort';
  /* harmony export (immutable) */ __webpack_exports__["d"] = UPDATE_DATE_SORT;
  
  
  class SortingPanel {
    constructor(onChange) {
      this._sortingPanel = document.createElement('div');
  
      let repoNameButton = this.createButton(REPO_NAME_SORT, 'Sort by repo name');
      let starsCountButton = this.createButton(
        STARS_COUNT_SORT,
        'Sort by stars count'
      );
      let openIssuesCountButton = this.createButton(
        OPEN_ISSUES_SORT,
        'Sort by open issues count'
      );
      let updatedDateButton = this.createButton(
        UPDATE_DATE_SORT,
        'Sort by updated date'
      );
  
      const buttons = [
        repoNameButton,
        starsCountButton,
        openIssuesCountButton,
        updatedDateButton
      ];
  
      this._sortingPanel.id = 'sorting-panel';
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* appendChildren */])(this._sortingPanel, buttons);
  
      /* The sorting function (called in App class) is defined by id of the
      clicked sort button and the sort order changed every time the button is clicked */
      this._sortingPanel.addEventListener('click', event => {
        const target = event.target.closest('.sort');
  
        if (target) {
          onChange({
            button: target.id,
            order: target.getAttribute('data-order')
          });
  
          buttons.forEach(button => button.classList.remove('clicked'));
          target.classList.add('clicked');
  
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
  
    createButton(id, title) {
      let button = document.createElement('button');
      button.id = id;
      button.classList.add('sort');
      button.setAttribute('data-order', 'ascending');
  
      let buttonTitle = document.createElement('span');
      buttonTitle.textContent = title;
      buttonTitle.classList.add('button-title');
  
      let arrow = document.createElement('span');
      arrow.classList.add('sort-order-arrow');
  
      button.appendChild(buttonTitle);
      button.appendChild(arrow);
  
      return button;
    }
  
    get domElement() {
      return this._sortingPanel;
    }
  }
  /* harmony export (immutable) */ __webpack_exports__["e"] = SortingPanel;
  
  
  
  /***/ }),
  /* 2 */
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
  /* 3 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_App__ = __webpack_require__(4);
  
  
  const app = new __WEBPACK_IMPORTED_MODULE_0__components_App__["a" /* default */]();
  app.draw();
  
  
  /***/ }),
  /* 4 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FirstScreen__ = __webpack_require__(5);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CardsList__ = __webpack_require__(6);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SortingPanel__ = __webpack_require__(1);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FilterPanel__ = __webpack_require__(8);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(2);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(0);
  
  
  
  
  
  
  
  
  
  
  const sortOrderMap = {
    ascending: 1,
    descending: -1
  };
  
  class App {
    constructor() {
      this.appWasStarted = false;
      this.owner = '';
      this.reposTotal = 0;
      this.onSubmitClick = this.onSubmitClick.bind(this);
      this.firstScreen = new __WEBPACK_IMPORTED_MODULE_0__FirstScreen__["a" /* default */](this.onSubmitClick);
      this.cardsData = [];
      this.cardsList = new __WEBPACK_IMPORTED_MODULE_1__CardsList__["a" /* default */]();
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
      this.addCardsData = this.addCardsData.bind(this);
      this.loadNewCards = this.loadNewCards.bind(this);
      this.sortCardsData = this.sortCardsData.bind(this);
      this.filterCardsData = this.filterCardsData.bind(this);
      this.passData = this.passData.bind(this);
      this.catchError = this.catchError.bind(this);
  
      window.addEventListener('scroll', this.loadNewCards);
  
      this.onSortPanelChange = this.onSortPanelChange.bind(this);
      this.sortingPanel = new __WEBPACK_IMPORTED_MODULE_2__SortingPanel__["e" /* default */](this.onSortPanelChange);
  
      this.onFilterPanelChange = this.onFilterPanelChange.bind(this);
      this.filterPanel = new __WEBPACK_IMPORTED_MODULE_3__FilterPanel__["a" /* default */](
        this.onFilterPanelChange,
        this.languages
      );
      this.filterFunctions;
    }
  
    /* This function is for getting the list of languages 
    of Filter panel language dropdown for it to stay synced with 
    cards displayed on the page at the moment */
    getLanguages(cardsData) {
      return cardsData.reduce(
        (languages, element) => {
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
      data.forEach(element => {
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
      const url = `users/${owner}/repos?page=${Object(__WEBPACK_IMPORTED_MODULE_5__utils__["e" /* getPageNumber */])(
        this.cardsData.length
      )}`;
  
      return Object(__WEBPACK_IMPORTED_MODULE_4__api__["a" /* get */])(url, {
        Accept: 'application/vnd.github.mercy-preview+json'
      }).then(this.passData, this.catchError);
    }
  
    getNumberOfRepos(owner) {
      return Object(__WEBPACK_IMPORTED_MODULE_4__api__["a" /* get */])(`users/${owner}`).then(
        data => data.public_repos,
        this.catchError
      );
    }
  
    loadNewCards() {
      if (Object(__WEBPACK_IMPORTED_MODULE_5__utils__["f" /* isScrolledToBottom */])()) {
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
      Object(__WEBPACK_IMPORTED_MODULE_5__utils__["c" /* clean */])(this.mainScreen);
  
      if (!this.appWasStarted) {
        this.mainScreen.appendChild(this.firstScreen.domElement);
      } else {
        Object(__WEBPACK_IMPORTED_MODULE_5__utils__["a" /* appendChildren */])(this.mainScreen, [
          this.filterPanel.domElement,
          this.sortingPanel.domElement,
          this.cardsList.domElement
        ]);
      }
    }
  
    onSortPanelChange(sortState) {
      this.sortState = sortState;
  
      this.cardsList.addCards(this.sortCardsData(this.filterCardsData()));
    }
  
    sortCardsData(data) {
      let sortedCardsData = data.slice();
  
      /* Github sorting by name is case insensitive. To implement the same
      behavior, I have to make all repository names lowercase before sorting */
      if (__WEBPACK_IMPORTED_MODULE_2__SortingPanel__["b" /* REPO_NAME_SORT */] === this.sortState.button) {
        sortedCardsData.forEach(card => {
          card.name = card.name.toLowerCase();
        });
      }
      __WEBPACK_IMPORTED_MODULE_5__utils__["b" /* cardSorters */][this.sortState.button](
        sortedCardsData,
        sortOrderMap[this.sortState.order]
      );
      return sortedCardsData;
    }
  
    onFilterPanelChange(filterState) {
      this.filterState = filterState;
  
      this.cardsList.addCards(this.sortCardsData(this.filterCardsData()));
    }
  
    filterCardsData() {
      let filteredCardsData = this.cardsData;
  
      filteredCardsData = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["d" /* filterArrayByState */])(filteredCardsData, this.filterState);
      this.languages = this.getLanguages(filteredCardsData);
      this.filterPanel.redrawLanguages(this.languages);
      return filteredCardsData;
    }
  }
  /* harmony export (immutable) */ __webpack_exports__["a"] = App;
  
  
  
  /***/ }),
  /* 5 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  const ENTER_KEY = 13;
  
  class FirstScreen {
    constructor(onSubmit) {
      this._firstScreen = document.createElement('div');
  
      let input = document.createElement('input');
      let submit = document.createElement('button');
  
      this._firstScreen.id = 'first-screen-container';
      input.id = 'user-or-org-name-input';
      input.type = 'text';
      input.placeholder = 'Enter username';
      submit.id = 'submit-button';
      submit.innerHTML = 'GET CARDS';
  
      const handleSubmit = () => {
        if (input.value.length) {
          input.removeEventListener('keydown', handleSubmit);
          input.removeEventListener('focus', removeError);
          onSubmit(input.value);
          showLoader();
        } else {
          input.classList.add('invalid');
        }
      };
  
      const showLoader = () => {
        input.setAttribute('disabled', true);
        submit.setAttribute('disabled', true);
        submit.innerHTML = 'Loading...';
      };
  
      const removeError = () => {
        input.classList.remove('invalid');
      };
  
      submit.addEventListener('click', handleSubmit);
      input.addEventListener('keydown', event => {
        if (event.which === ENTER_KEY) {
          handleSubmit();
        }
      });
      input.addEventListener('focus', removeError);
  
      this._firstScreen.appendChild(input);
      this._firstScreen.appendChild(submit);
    }
  
    get domElement() {
      return this._firstScreen;
    }
  }
  /* harmony export (immutable) */ __webpack_exports__["a"] = FirstScreen;
  
  
  
  /***/ }),
  /* 6 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ModalWindow__ = __webpack_require__(7);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
  
  
  
  
  const MILLISECONDS_IN_DAY = 86400000;
  
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
      let titleContainer = document.createElement('div');
      titleContainer.classList.add('title-container');
  
      let repoName = document.createElement('a');
      repoName.innerText = this.repoName;
      repoName.href = this.url;
      repoName.classList.add('card-repo-name');
  
      nameForkContainer.appendChild(titleContainer);
      titleContainer.appendChild(repoName);
  
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
      let dayDiff = Math.floor((curDate - this.date) / MILLISECONDS_IN_DAY);
  
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
      let description = document.createElement('p');
  
      description.innerHTML = this.description;
      description.classList.add('card-description');
      return description;
    }
  
    createCardLanguage() {
      let language = document.createElement('p');
  
      language.innerHTML = this.language;
      language.classList.add('card-language');
      return language;
    }
  
    createCardForkedRepo() {
      let forked = document.createElement('p');
  
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
  
    /* This function renews the array of card objects and 
    recreates needed DOM elements at once */
    addCards(cardsData) {
      this.cards = cardsData.map((data, index) => new Card(data, index));
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* clean */])(this._domElement);
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
  
    /* In order not to draw each card DOM element on the page separately, 
    I gather them in a container at first */
    draw() {
      let cardsBlockWrapper = document.createElement('div');
      cardsBlockWrapper.classList.add('cards-block-wrapper');
  
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* appendChildren */])(cardsBlockWrapper, this.cards.map(card => card.domElement));
      this._domElement.appendChild(cardsBlockWrapper);
    }
  }
  /* harmony export (immutable) */ __webpack_exports__["a"] = CardsList;
  
  
  
  /***/ }),
  /* 7 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api__ = __webpack_require__(2);
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
  
  
  
  const bytesToKb = bytes => Math.round(bytes / 125);
  
  class ModalWindow {
    constructor(cardData) {
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
  
      /* Only when all the data is collected from the server,
      we are ready to create the window DOM element */
      Promise.all(requests).then(gitHubData => {
        this.isWithData = true;
        this.initModalWindow(gitHubData, cardData);
      });
  
      this.close = this.close.bind(this);
      this.overlay.addEventListener('click', this.close);
    }
  
    initModalWindow(data, cardData) {
      const [contributors, languages, pullRequests, forkedFrom] = data;
      const { repoName, url } = cardData;
  
      let children = [
        this.getHeading(repoName, url, forkedFrom),
        this.getContributorsContainer(contributors),
        this.getLanguagesContainer(languages)
      ];
  
      /* There are repositories with no pull requests. If this is the case,
      there is no need to draw the container */
      if (pullRequests.length) {
        children.push(this.getPrsContainer(pullRequests));
      }
  
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* clean */])(this.window);
  
      this.window.appendChild(this.getWindowContent(children));
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
  
      contributors.forEach(item => {
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
  
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* appendChildren */])(
        prsList,
        prs.map(item => {
          let li = document.createElement('li');
          li.innerHTML = `<a href = '${item.html_url}'>${item.title}</a>`;
          return li;
        })
      );
  
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* appendChildren */])(prsContainer, [prsHeading, prsList]);
  
      return prsContainer;
    }
  
    getOkButton() {
      let okButton = document.createElement('button');
  
      okButton.id = 'ok-button';
      okButton.innerHTML = 'OK';
      okButton.addEventListener('click', this.close);
      return okButton;
    }
  
    getWindowContent([heading, ...rest]) {
      let innerWrapper = document.createElement('div');
      let contentContainer = document.createElement('div');
      let okButton = this.getOkButton();
  
      innerWrapper.id = 'card-details-wrapper';
      contentContainer.id = 'content-container';
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* appendChildren */])(contentContainer, rest);
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* appendChildren */])(innerWrapper, [heading, contentContainer, okButton]);
  
      return innerWrapper;
    }
  
    getForkedFrom(owner, repoName) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* get */])(`repos/${owner.login}/${repoName}`).then(
        data => data.parent.full_name
      );
    }
  
    getContributors(owner, repoName) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* get */])(`repos/${owner.login}/${repoName}/contributors`).then(
        data => {
          let contributors = data.map(({ login, html_url, contributions }) => ({
            login,
            html_url,
            contributions
          }));
          return contributors.splice(0, 3);
        },
        error => {
          alert(error.message);
        }
      );
    }
  
    getLanguages(owner, repoName) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* get */])(`repos/${owner.login}/${repoName}/languages`).then(
        languages => {
          return Object.keys(languages).reduce((acc, title) => {
            const langSize = bytesToKb(languages[title]);
  
            if (langSize > 1) {
              acc[title] = langSize;
            }
  
            return acc;
          }, {});
        },
        error => {
          alert(error.message);
        }
      );
    }
  
    getPullRequests(owner, repoName) {
      return Object(__WEBPACK_IMPORTED_MODULE_0__api__["a" /* get */])(`repos/${owner.login}/${repoName}/pulls?sort=popularity`).then(
        data => {
          let prs = data.map(({ title, html_url }) => ({
            title,
            html_url
          }));
          return prs.splice(0, 5);
        },
        error => {
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
  /* 8 */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {
  
  "use strict";
  /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
  
  
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
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* appendChildren */])(hasOpenIssuesContainer, [
        hasOpenIssuesLabel,
        hasOpenIssuesCheckbox
      ]);
      topicsLabel.innerHTML = 'Has topics';
      topicsCheckbox.type = 'checkbox';
      topicsContainer.appendChild(topicsLabel);
      topicsContainer.appendChild(topicsCheckbox);
      starLabel.innerHTML = 'Starred';
      starInput.id = 'star-input';
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
      applyButton.classList.add('apply-filter-button');
  
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
  
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* appendChildren */])(typeDropdown, [option1, option2, option3]);
  
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* appendChildren */])(this._filterPanel, [
        hasOpenIssuesContainer,
        topicsContainer,
        starContainer,
        calendarContainer,
        typeDropdown,
        this._languageDropdown,
        applyButton
      ]);
  
      this.drawLanguages = this.drawLanguages.bind(this);
    }
  
    get domElement() {
      return this._filterPanel;
    }
  
    drawLanguages(languages) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* clean */])(this._languageDropdown);
  
      languages.forEach(element => {
        let option = document.createElement('option');
        option.innerHTML = element;
        this._languageDropdown.appendChild(option);
      });
    }
  
    /* Every time the cards are filtered, I have to redraw the language dropdown. 
    The language selected in it before redrawing should stay selected 
    except the case when the filter result becomes empty */
    redrawLanguages(nextLanguages) {
      let selected = this._languageDropdown.options[
        this._languageDropdown.selectedIndex
      ].innerHTML;
  
      this.drawLanguages(nextLanguages);
  
      this._languageDropdown.selectedIndex = ~nextLanguages.indexOf(selected)
        ? nextLanguages.indexOf(selected)
        : 0;
    }
  }
  /* harmony export (immutable) */ __webpack_exports__["a"] = FilterPanel;
  
  
  
  /***/ })
  /******/ ]);
  