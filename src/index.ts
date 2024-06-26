import { View } from './view.js';
import { CameraApp } from './camera.js';

const home = new View('app-home');
const init = new View('app-init');
const main = new View('app-main');
const tfToy = new CameraApp();

function enableHomeView(): void {
  home.show();
  home.button.addEventListener('click', () => {
    home.hide();
    init.show();
    init.button.addEventListener('click', enableWebCam);
  });
}

async function enableWebCam(): Promise<void> {
  try {
    await tfToy.enableApp();
    init.hide();
    main.show();
  } catch (e) {
    const prompt = document.getElementById('prompt');
    prompt.innerText = 'Something went wrong...';
  }
}

function app(): void {
  enableHomeView();
}

app();
