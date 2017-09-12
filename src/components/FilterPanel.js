import { clean, appendChildren } from '../utils';

export default class FilterPanel {
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
    appendChildren(hasOpenIssuesContainer, [
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

    appendChildren(typeDropdown, [option1, option2, option3]);

    appendChildren(this._filterPanel, [
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
    clean(this._languageDropdown);

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
