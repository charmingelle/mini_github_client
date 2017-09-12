import { appendChildren } from '../utils';

export const REPO_NAME_SORT = 'repo-name-sort';
export const STARS_COUNT_SORT = 'stars-count-sort';
export const OPEN_ISSUES_SORT = 'open-issues-sort';
export const UPDATE_DATE_SORT = 'update-date-sort';

export default class SortingPanel {
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
    appendChildren(this._sortingPanel, buttons);

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
