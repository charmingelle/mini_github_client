export default class SortingPanel {
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
