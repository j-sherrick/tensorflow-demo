import { View } from './view.js';

const home = new View('app-home');
const init = new View('app-init');
const main = new View('app-main');

function enableHomeView(): void {
  home.show();
  home.button.addEventListener('click', () => {
    home.hide();
    init.show();
    init.button.addEventListener('click', () => {});
  });
}

function app(): void {
  enableHomeView();
}

app();
