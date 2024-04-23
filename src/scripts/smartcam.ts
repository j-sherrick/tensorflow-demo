import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { DetectedObject, ObjectDetection } from '@tensorflow-models/coco-ssd';

interface Constraints {
   video?: boolean | MediaTrackConstraints;
   audio?: boolean | MediaTrackConstraints;
}

interface SmartCamComponents {
   video: HTMLVideoElement;
   button: HTMLButtonElement;
   overlay: HTMLDivElement;
   boundingBoxes?: Array<HTMLDivElement> | null;
   boxClasses?: Array<string> | null;

   stream?: MediaStream | null;
   model?: ObjectDetection | null;
   objects?: Array<DetectedObject> | null;

   maxObjects?: number;
   minConfidence?: number;
   constraints?: Constraints | null;
}

export class SmartCam {

   private video: HTMLVideoElement;
   private button: HTMLButtonElement;
   private overlay: HTMLDivElement;
   private boundingBoxes: Array<HTMLDivElement> = [];
   private boxClasses: Array<string> = ['a', 'b', 'c', 'd', 'e'];

   private stream: MediaStream | null;
   private model: ObjectDetection | null = null;
   private objects: Array<DetectedObject> = [];

   private maxObjects: number = 5;
   private minConfidence: number = 0.8;


   private constraints: Constraints;

   constructor(components: SmartCamComponents) {
      this.video = components.video;
      this.overlay = components.overlay;
      this.button = components.button;
      this.button.addEventListener('click', this.loadModel.bind(this));
      this.button.innerText = 'Load Model';
      
      this.stream = components.stream || null;
      this.constraints = components.constraints || {
         video: {
            width: { ideal: 1280 },
            aspectRatio: { ideal: 16 / 9 },
            frameRate: { ideal: 30 }
         },
         audio: false
      };
   }

   private async loadModel(): Promise<void> {
      this.model = await cocossd.load();
      if (this.model) {
         this.button.innerText = 'Enable Webcam';
         this.button.removeEventListener('click', this.loadModel);
         this.button.addEventListener('click', this.enableWebcam.bind(this));
      }
      else {
         console.error('Error loading the model');
         this.button.innerText = 'Model Not Loaded!';
         this.button.removeEventListener('click', this.loadModel);
         this.button.disabled = true;
         this.button.classList.add('disabled');
      }
   }

   private async enableWebcam(): Promise<void> {
      if(this.getUserMediaSupported()) {
            try {
               this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
               if(this.video && this.stream) {
                  this.video.srcObject = this.stream;

                  console.log(`Video dimensions: ${this.video.videoWidth}px X ${this.video.videoHeight}px`);

                  this.button.removeEventListener('click', this.enableWebcam);
                  this.button.addEventListener('click', this.enableSmartCam.bind(this));
                  this.button.innerText = 'Enable Smart Cam';
                  this.initBoundingBoxes();

               }
            }
            catch(err) {
               console.error('Error accessing the webcam', err);
            }
         }
      else {
         console.log('getUserMedia() not supported by your browser');
      }
   }

   private async enableSmartCam(): Promise<void> {
      this.removeButton();
      console.log(`Video dimensions: ${this.video.videoWidth}px X ${this.video.videoHeight}px`);
      await this.enableObjectDetection();
   }

   // enables the full object detection process with overlay
   private async enableObjectDetection(): Promise<void> {
      console.log(`Video dimensions: ${this.video.videoWidth}px X ${this.video.videoHeight}px`);
      await this.detectObjects();
      this.updateBoundingBoxes();
      await this.video.requestVideoFrameCallback(this.enableObjectDetection.bind(this));
   }

   private initBoundingBoxes(): void {
      for (let i = 0; i < this.maxObjects; i++) {
         const box = document.createElement('div');
         const text = document.createElement('span')
         text.classList.add('bounding-box__label');
         box.classList.add('bounding-box', this.boxClasses[i]);
         box.appendChild(text);
         this.boundingBoxes.push(box);
      }
   }

   private updateBoundingBoxes(): void {
      // Get the rendered dimensions of the video element
      const renderedWidth = this.video.offsetWidth;
      const renderedHeight = this.video.offsetHeight; 
      // Calculate the scaling factors
      const scaleX = renderedWidth / this.video.videoWidth;
      const scaleY = renderedHeight / this.video.videoHeight;
         this.objects.forEach((object, i) => {
            const box = this.boundingBoxes[i];
            let [ x, y, width, height ] = object.bbox; 
            // scale the bounding box to the video element
            x *= scaleX;
            y *= scaleY;
            width *= scaleX;
            height *= scaleY;  
            const { class: label, score: confidence } = object;
            const text = box.querySelector('span');
            if (text) {
               text.innerText = `${label} with ${Math.round(confidence * 100)}% confidence`;
            }   
            box.style.top = `${y}px`;
            box.style.left = `${x}px`;
            box.style.width = `${width}px`;
            box.style.height = `${height}px`; 
            this.overlay.appendChild(box);
         });
   }

   private removeBoundingBoxes(): void {
      this.boundingBoxes.forEach(box => box.remove());
   }

   private async detectObjects(): Promise<void> {
      try {
         this.objects = await this.model.detect(
            this.video,
            this.maxObjects,
            this.minConfidence
         );
      }
      catch (err) {
         console.error('Error detecting objects', err);
      }
   }

   private getUserMediaSupported(): boolean {
      return !!(
         navigator.mediaDevices &&
         navigator.mediaDevices.getUserMedia);
   }

   private streamIsEnabled(): boolean {
      return this.stream.getVideoTracks()[0].enabled;
   }

   private videoHasDimensions(): boolean {
      return this.video.videoWidth > 0 && this.video.videoHeight > 0;
   }

   private removeButton(): void {
      if(this.button) {
         this.button.remove();
      }
   }
}
   
