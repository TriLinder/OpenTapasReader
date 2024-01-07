<h1 align="center">OpenTapasReader</h1>

<p align="center">
    OpenTapasReader is an open-source Android client for viewing <a href="https://tapas.io/">Tapas.io</a> comics. <br>
    Built with <a href="https://svelte.dev/">Svelte</a> and <a href="https://capacitorjs.com/">Capacitor</a>.
</p>

## Features

- Local comic library

- Viewing comics and comic episodes

- Downloading episodes for offline use

- Viewing comments

- English and Czech language support (contributions are welcome)

## Installation

- Download and install an `.apk` file from the [Releases](https://github.com/TriLinder/OpenTapasReader/releases/latest) page
- Alternatively, you can build the app from source (see below)

## Screenshots

<p align="center">
  <img alt="Library page" src="README_ASSETS/screenshots/1.png" width="200" />
  <img alt="Episode list view showing downloaded episodes" src="README_ASSETS/screenshots/2.png" width="200" /> 
  <img alt="Episode's comments section" src="README_ASSETS/screenshots/3.png" width="200" />
  <img alt="Library page in Czech language" src="README_ASSETS/screenshots/4.png" width="200" />
</p>

## Building

Prerequisites: Android Studio and Node.js

1. Clone the repository

2. Run `npm install` in the directory to install project dependencies

3. Run `npm run dev` to debug the application in a web browser (You must temporarily [disable CORS protection](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/) for the application to work properly. **Please make sure to enable it again as soon as possible.**)

4. Run `npm run build && npx cap sync && npx cap open android` to build the web files and open the application in Android studio

5. Build the application in Android Studio