

export interface ViewInterface {
   id: string;
   view: HTMLElement;
   button?: HTMLButtonElement;
   show(): void;
   hide(): void;
   isVisible(): boolean;
}

export class View implements ViewInterface {

   id: string;
   view: HTMLElement;
   button?: HTMLButtonElement;

   constructor(id: string) {
      this.id = id;
      this.view = document.getElementById(id) as HTMLElement;
      if (!this.view) {
         throw new Error(`No element with id '${id}' found`);
      }
      const button = this.view.querySelector('button');
      if(button) {
         this.button = button as HTMLButtonElement;
      }
   }

   show(): void {
      if (!this.isVisible()) { 
         this.view.classList.toggle('removed');
      }
   }

   hide(): void {
      if (this.isVisible()) {
         this.view.classList.toggle('removed');
      }
   }

   isVisible(): boolean {
      return !this.view.classList.contains('removed');
   }
}