import { View } from "./View.js";

export class InitView extends View {
   button: HTMLButtonElement;
   prompt: HTMLParagraphElement;

   constructor() {
      super('app-init');
      this.button = this.view.querySelector('button') as HTMLButtonElement;
      this.prompt = this.view.querySelector('#prompt') as HTMLParagraphElement;
      this.prompt.textContent = 'Press the button to load the model and access your camera';
   }
}