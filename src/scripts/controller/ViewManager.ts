import { HomeView } from "../views/HomeView.js";
import { InitView } from "../views/InitView.js";
import { AppView } from "../views/AppView.js";

export class ViewManager {
   home: HomeView;
   init: InitView;
   app: AppView;

   constructor() {
      this.home = new HomeView();
      this.init = new InitView();
      this.app = new AppView();
      this.home.button.addEventListener('click', () => {
         this.home.hide();
         this.init.show();
      });
      this.home.show();
   }
}