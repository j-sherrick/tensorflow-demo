# TensorFlow Demo
This project is a simple demonstration of using TensorFlow.js to detect objects in images. It uses the COCO-SSD model for object detection.

## SmartCam
The main class in this project is `SmartCam`, which is defined in `src/scripts/smartcam.ts`. This class uses a video feed from a webcam, a button to start the object detection, and an overlay to display the detected objects.

The `SmartCam` class has several methods for enabling the webcam, loading the TensorFlow model, detecting objects in the video feed, and displaying the detected objects on the overlay.

## Installation
To install the project, run:
```
npm install
```
This will install all the necessary dependencies listed in the package.json file.

## Building
To build the project, run:
```
npm run build
```
This will use Parcel to bundle the project and output the result in the dist directory.

## Development
To start the development server, run:
```
npm run dev
```
This will start a Parcel development server with hot module replacement.

## Dependencies
This project uses several dependencies:

- TensorFlow.js and its CPU and WebGL backends for running the object detection model.
- The COCO-SSD model for object detection.
- Parcel for bundling the project.
- Sass for styling.
- License:
   - This project is licensed under the MIT license.