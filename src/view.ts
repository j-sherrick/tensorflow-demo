export interface ViewInterface {
  id: string;
  element: HTMLElement;
  button?: HTMLButtonElement;
  show(): void;
  hide(): void;
  isVisible(): boolean;
}

export class View implements ViewInterface {
  id: string;
  element: HTMLElement;
  button?: HTMLButtonElement;

  constructor(id: string) {
    this.id = id;
    this.element = document.getElementById(id) as HTMLElement;
    if (!this.element) {
      throw new Error(`No element with id '${id}' found`);
    }
    const button = this.element.querySelector('button');
    if (button) {
      this.button = button as HTMLButtonElement;
    }
  }

  show(): void {
    if (!this.isVisible()) {
      this.element.classList.toggle('removed');
    }
  }

  hide(): void {
    if (this.isVisible()) {
      this.element.classList.toggle('removed');
    }
  }

  isVisible(): boolean {
    return !this.element.classList.contains('removed');
  }
}
