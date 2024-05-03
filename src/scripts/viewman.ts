import { HomeView } from "../pageview/home.js";
import { InitView } from "../pageview/init.js";
import { MainView } from "../pageview/main.js";

export class ViewManager {
   home: HomeView;
   init: InitView;
   app: MainView;

   constructor() {
      this.home = new HomeView();
      this.init = new InitView();
      this.app = new MainView();
      this.home.button.addEventListener('click', () => {
         this.home.hide();
         this.init.show();
      });
      this.home.show();
   }
}