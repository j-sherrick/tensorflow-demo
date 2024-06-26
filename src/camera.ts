/**
 *
 */

interface Webcam {
  video: HTMLVideoElement | null;
  w?: number;
  h?: number;
}

export class CameraApp {
  webcam: Webcam = { video: null };
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor() {
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

  public async enableApp(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (!stream) {
      throw new Error('Unkown error - stream was possibly null');
    }
    this.webcam.video.srcObject = stream;
    this.webcam.video.onloadedmetadata = () => {
      this.webcam.w = this.webcam.video.videoWidth;
      this.webcam.h = this.webcam.video.videoHeight;
      this.canvas.width = this.webcam.w;
      this.canvas.height = this.webcam.h;
    };
    this.drawBlackAndWhite();
  }

  public async enableDetector(): Promise<void> {}

  public drawBlackAndWhite(): void {
    this.context.drawImage(this.webcam.video, 0, 0);
    let imgData: ImageData = this.context.getImageData(0, 0, this.webcam.w, this.webcam.h);
    imgData = this.blackAndWhite(imgData);
    this.context.putImageData(imgData, 0, 0);
    console.log(`Put image data - width: ${imgData.width}, height: ${imgData.height}`);
    this.webcam.video.requestVideoFrameCallback(this.drawBlackAndWhite.bind(this));
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
