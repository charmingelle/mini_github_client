import {
  REPO_NAME_SORT,
  STARS_COUNT_SORT,
  OPEN_ISSUES_SORT,
  UPDATE_DATE_SORT
} from './components/SortingPanel';

export const cardSorters = {
  [REPO_NAME_SORT]: createSorter('name'),
  [STARS_COUNT_SORT]: createSorter('stargazers_count'),
  [OPEN_ISSUES_SORT]: createSorter('open_issues_count'),
  [UPDATE_DATE_SORT]: createSorter('updated_at')
};

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

export function filterArrayByState(array, filterState) {
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

export function filterByStars(array, filterState) {
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

export function getPageNumber(reposAmount) {
  const MAX_REPOS_ON_PAGE = 30;

  return reposAmount / MAX_REPOS_ON_PAGE + 1;
}

export function isScrolledToBottom() {
  return (
    window.innerHeight + document.body.scrollTop + 1 >=
    document.body.scrollHeight
  );
}

export function appendChildren(target, children) {
  children.forEach(child => target.appendChild(child));
}

export function clean(domElement) {
  while (domElement.firstChild) {
    domElement.removeChild(domElement.firstChild);
  }
}
