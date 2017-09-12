import {
  REPO_NAME_SORT,
  STARS_COUNT_SORT,
  OPEN_ISSUES_SORT,
  UPDATE_DATE_SORT
} from './components/SortingPanel';

/* This function is for creating any sorting function, 
which uses the order defined by key */
function createSorter(key) {
  return function(arr, order) {
    arr.sort((a, b) => {
      if (a[key] > b[key]) return order;
      if (a[key] < b[key]) return -order;
    });
  };
}

export const cardSorters = {
  [REPO_NAME_SORT]: createSorter('name'),
  [STARS_COUNT_SORT]: createSorter('stargazers_count'),
  [OPEN_ISSUES_SORT]: createSorter('open_issues_count'),
  [UPDATE_DATE_SORT]: createSorter('updated_at')
};

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

export function filterByPresentOpenIssues(arr) {
  return arr.filter(element => element.open_issues_count > 0);
}

export function filterByPresentTopics(arr) {
  return arr.filter(
    element => Array.isArray(element.topics) && element.topics.length
  );
}

export function filterByStarred(arr, times) {
  return arr.filter(element => element.stargazers_count >= times);
}

export function filterByUpdatedAfter(arr, date) {
  return arr.filter(element => element.updated_at - date > 0);
}

export function filterForks(arr) {
  return arr.filter(element => element.fork === true);
}

export function filterSources(arr) {
  return arr.filter(element => element.fork === false);
}

export function filterByLanguage(arr, language) {
  return arr.filter(element => element.language === language);
}

export function clean(domElement) {
  while (domElement.firstChild) {
    domElement.removeChild(domElement.firstChild);
  }
}

export function appendChildren(target, children) {
  children.forEach(child => target.appendChild(child));
}
