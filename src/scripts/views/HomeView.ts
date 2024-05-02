import { View } from './View.js';


export class HomeView extends View {

   button: HTMLButtonElement;

   constructor() {
      super('app-home');
      this.button = this.view.querySelector('button') as HTMLButtonElement;
   }
}