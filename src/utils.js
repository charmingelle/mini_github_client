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

export function sortByRepoName(arr, order) {
  arr.sort(function(a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return order;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -order;
  });
}

export function sortByStarsCount(arr, order) {
  arr.sort(function(a, b) {
    if (a.stargazers_count > b.stargazers_count) return order;
    if (a.stargazers_count < b.stargazers_count) return -order;
  });
}

export function sortByOpenIssuesCount(arr, order) {
  arr.sort(function(a, b) {
    if (a.open_issues_count > b.open_issues_count) return order;
    if (a.open_issues_count < b.open_issues_count) return -order;
  });
}

export function sortByUpdatedDate(arr, order) {
  arr.sort(function(a, b) {
    if (a.updated_at > b.updated_at) return order;
    if (a.updated_at < b.updated_at) return -order;
  });
}

export function filterByPresentOpenIssues(arr) {
  return arr.filter(function(element) {
    return element.open_issues_count > 0;
  });
}

export function filterByPresentTopics(arr) {
  return arr.filter(function(element) {
    return Array.isArray(element.topics) && element.topics.length;
  });
}

export function filterByStarred(arr, times) {
  return arr.filter(function(element) {
    return element.stargazers_count >= times;
  });
}

export function filterByUpdatedAfter(arr, date) {
  return arr.filter(function(element) {
    return element.updated_at - date > 0;
  });
}

export function filterForks(arr) {
  return arr.filter(function(element) {
    return element.fork === true;
  });
}

export function filterSources(arr) {
  return arr.filter(function(element) {
    return element.fork === false;
  });
}

export function filterByLanguage(arr, language) {
  return arr.filter(function(element) {
    return element.language == language;
  });
}
