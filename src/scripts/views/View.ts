

export interface IView {
   show(): void;
   hide(): void;
   isRemoved(): boolean;
}

export class View implements IView {

   protected id: string;
   protected view: HTMLElement;

   constructor(id: string) {
      this.id = id;
      this.view = document.getElementById(id) as HTMLElement;
      if (!this.view) {
         throw new Error(`No element with id '${id}' found`);
      }
   }

   show(): void {
      if (this.isRemoved()) { 
         this.view.classList.toggle('removed');
      }
   }

   hide(): void {
      if (!this.isRemoved()) {
         this.view.classList.toggle('removed');
      }
   }

   isRemoved(): boolean {
      return this.view.classList.contains('removed');
   }
}