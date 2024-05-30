# TensorFlow Toy

This project is a simple demonstration of using TensorFlow.js's Face landmark detection to acheive simple SnapChat-like filters in the browser, allowing the user to take a snapshot and save the end result.

## TODO

This project is a work in progress...

- [ ] Improve this README
- [ ] Refactor and do my best impression of an MVC pattern
- [ ] Manage to get a face landmarker model loaded
- [ ] Extract the menu logic into an overall App class
- [x] Get webcam stream and display it back to the user
- [x] Create a simple filter and use it

## Installation

To install the project, just run the usual:

```bash
npm install
```

This will install all the necessary dependencies listed in the package.json file. Right now, there are none besides some basic development dependencies. It assumes you have Sass and TypeScript installed globally.

## Building

To build the project, run:

```bash
npm run build
```

This will allegedly use Parcel to bundle the project and output the result in the dist directory, although I've never done it myself. I'm considering moving this project to [Vite](https://vitejs.dev/guide/why.html).

## Development

To start the development server, run:

```bash
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
