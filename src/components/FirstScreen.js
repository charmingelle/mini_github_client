const ENTER_KEY = 13;

export default class FirstScreen {
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
