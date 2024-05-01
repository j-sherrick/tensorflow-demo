import '@tensorflow/tfjs-backend-webgl';

interface Webcam {
   video: HTMLVideoElement | null;
   w?: number;
   h?: number;
}

export class TensorFlowToy {
   views: Array<HTMLElement> = [];
   webcam: Webcam = { video: null };
   canvas: HTMLCanvasElement;
   context: CanvasRenderingContext2D;

   constructor() {
      // Get the views and make sure they exist
      this.views[0] = document.getElementById('app-home');
      this.views[1] = document.getElementById('app-init');
      this.views[2] = document.getElementById('app-main');
      if (!this.views[0] || !this.views[1] || !this.views[2]) {
         throw new Error('One or more <section> elements were missing from the DOM');
      }

      // Show the home section 'app-home' and set up the button event
      this.views[0].classList.toggle('removed');
      this.views[0].querySelector('button')
         .addEventListener('click', this.displayEnableSection.bind(this));

      // Set up the button event for the enable webcam section 'app-enable'
      this.views[1].querySelector('button')
         .addEventListener('click', this.enableApp.bind(this));

      // Get the webcam and canvas elements
      this.webcam.video = document.getElementById('webcam') as HTMLVideoElement;
      this.canvas = document.getElementById('overlay') as HTMLCanvasElement;
      if (!this.webcam || !this.canvas) {
         throw new Error('No video or canvas element found');
      }
      this.context = this.canvas.getContext('2d');
      if (!this.context) {
         throw new Error('Could not get 2d context from canvas');
      }
   }

   private displayEnableSection(): void {
      // Tear down the 'app-home' section
      this.views[0].querySelector('button')
         .removeEventListener('click', this.displayEnableSection.bind(this));
      this.views[0].classList.toggle('removed');

      // Display the 'app-enable' section
      this.views[1].classList.toggle('removed');
   }

   private async enableApp(): Promise<void> {
      // Get the prompt and button elements so we can manipulate them later
      let prompt = document.getElementById('enable');
      let button = this.views[1].querySelector('button');

      // Check if the browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
         button.removeEventListener('click', this.enableApp.bind(this));
         button.classList.toggle('removed');
         prompt.classList.toggle('enable__prompt--error');
         prompt.textContent = 'Browser not supported';
      }

      // try and set up our webcam stream...
      try {
         const stream = await navigator.mediaDevices.getUserMedia({video: true});
         if (!stream) {
            throw new Error('Unkown error - stream was possibly null');
         }

         // Tear down the 'app-enable' section
         button.removeEventListener('click', this.enableApp.bind(this));
         this.views[1].classList.toggle('removed');

         // Display the main app section 'app-main' and set the webcam stream
         this.views[2].classList.toggle('removed');
         this.webcam.video.srcObject = stream;
         this.webcam.video.onloadedmetadata = () => {
            this.webcam.w = this.webcam.video.videoWidth;
            this.webcam.h = this.webcam.video.videoHeight;
            this.canvas.width = this.webcam.w;
            this.canvas.height = this.webcam.h;
            this.draw();
         };
       } catch(error) {
         //    some errors...
         switch(error.name) {
            case 'NotAllowedError':
               prompt.textContent = 'Please refresh the page and allow camera access';
               break;
            case 'NotFoundError':
               prompt.textContent = 'No camera found';
               break;
            case 'NotReadableError':
               prompt.textContent = 'Camera is in use';
               break;
            default:
               prompt.textContent = 'An error occurred';
               break;
         }
       }
   }

   private draw(): void {
      this.context.drawImage(this.webcam.video, 0, 0);
      let imgData: ImageData = this.context.getImageData(0, 0, this.webcam.w, this.webcam.h);
      imgData = this.blackAndWhite(imgData);
      this.context.putImageData(imgData, 0, 0);
      console.log(`Put image data - width: ${imgData.width}, height: ${imgData.height}`);
      this.webcam.video.requestVideoFrameCallback(this.draw.bind(this));
   }

   private blackAndWhite(img: ImageData): ImageData {
      for (let i = 0; i < img.data.length; i += 4) {
         const avg = (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
         img.data[i] = avg;
         img.data[i + 1] = avg;
         img.data[i + 2] = avg;
      }
      return img;
   }
}