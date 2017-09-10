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
