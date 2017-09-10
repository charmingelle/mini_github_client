export default class FirstScreen {
  constructor(onSubmit) {
    this._firstScreen = document.createElement('div');

    let input = document.createElement('input');
    let submit = document.createElement('button');

    this._firstScreen.id = 'first-screen-container';
    input.id = 'user-or-org-name-input';
    input.type = 'text';
    input.placeholder = 'Enter user name here';
    submit.id = 'submit-button';
    submit.innerHTML = 'Submit';

    submit.addEventListener('click', function() {
      onSubmit(input.value);
    });

    this._firstScreen.appendChild(input);
    this._firstScreen.appendChild(submit);
  }

  get domElement() {
    return this._firstScreen;
  }
}
