export class TensorFlowToy {
   section: HTMLElement;
   webcam: HTMLVideoElement;
   canvas: HTMLCanvasElement;
   button: HTMLButtonElement;

   constructor() {
      this.section = document.getElementById('app-home');
      this.button = this.section.querySelector('button');
      this.webcam = document.getElementById('webcam') as HTMLVideoElement;
      this.canvas = document.getElementById('overlay') as HTMLCanvasElement;
   }
   
   public init() {
      this.section.classList.toggle('removed');
      this.button.addEventListener('click', this.toggleEnableSection.bind(this));
   }

    private toggleEnableSection(): void {
      this.section.classList.toggle('removed');
      this.section = document.getElementById('app-enable');
      this.section.classList.toggle('removed');
      this.button = this.section.querySelector('button');
      this.button.removeEventListener('click', this.toggleEnableSection.bind(this));
      this.button.addEventListener('click', this.enableWebcam.bind(this));
    }

    private async enableWebcam(): Promise<void> {
      this.button.classList.toggle('removed');
      let prompt: HTMLElement = document.getElementById('load');
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
         prompt.classList.toggle('removed');
         prompt = document.getElementById('incompatible');
         prompt.classList.toggle('removed');
      }
      
      try {
         prompt.classList.toggle('removed');
         prompt = document.getElementById('loading');
         prompt.classList.toggle('removed');
         const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
         this.webcam.srcObject = stream;
         this.section.classList.toggle('removed');
         this.section = document.getElementById('app-main');
         this.section.classList.toggle('removed');
      }
      catch (error) {
         if (error.name === 'NotAllowedError') {
            prompt.classList.toggle('removed');
            prompt = document.getElementById('access');
            prompt.classList.toggle('removed');
         }
         else {
            prompt.classList.toggle('removed');
            prompt = document.getElementById('fatal');
            prompt.classList.toggle('removed');
            console.error(error);
         }
      }
    }

    private toggleHomeSection(): void {
      this.section.classList.toggle('removed');
      this.section = document.getElementById('app-home');
      this.section.classList.toggle('removed');
      this.button = this.section.querySelector('button');
    }
}