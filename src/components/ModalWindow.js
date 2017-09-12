import { get } from '../api';
import { clean, appendChildren } from '../utils';

const bytesToKb = bytes => Math.round(bytes / 125);

export default class ModalWindow {
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

    clean(this.window);

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

    appendChildren(
      prsList,
      prs.map(item => {
        let li = document.createElement('li');
        li.innerHTML = `<a href = '${item.html_url}'>${item.title}</a>`;
        return li;
      })
    );

    appendChildren(prsContainer, [prsHeading, prsList]);

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
    appendChildren(contentContainer, rest);
    appendChildren(innerWrapper, [heading, contentContainer, okButton]);

    return innerWrapper;
  }

  getForkedFrom(owner, repoName) {
    return get(`repos/${owner.login}/${repoName}`).then(
      data => data.parent.full_name
    );
  }

  getContributors(owner, repoName) {
    return get(`repos/${owner.login}/${repoName}/contributors`).then(
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
    return get(`repos/${owner.login}/${repoName}/languages`).then(
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
    return get(`repos/${owner.login}/${repoName}/pulls?sort=popularity`).then(
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
