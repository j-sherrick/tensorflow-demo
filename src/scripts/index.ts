import { SmartCam } from "./smartcam.js";

const div = document.querySelector('div.smart-cam') as HTMLDivElement;
const overlay = div.querySelector('#overlay') as HTMLDivElement;
const button = div.querySelector('button') as HTMLButtonElement;
const video = div.querySelector('video') as HTMLVideoElement;

const smartCam = new SmartCam({ video, button, overlay, minConfidence: 0.5, maxObjects: 3});