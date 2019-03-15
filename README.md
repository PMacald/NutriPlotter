# NutriPlotter
# Installation

```bash
    npm install -g expo-cli
```
# Deployment

```bash
    git clone http://stgit.dcs.gla.ac.uk/tp3-2018-se4/dissertation
    cd dissertation
    expo start
```

### Overview
NutriPlotter is an Expo application, meaning it is designed to run natively on a range of devices, primarily smartphones running an Android OS, or iOS in the case of iPhones. The app is based around the concept of a “digital plate” that can be adjusted  in both portion size and food composition to provide an effective estimate of the nutritional value of the meal built in the app. This is the core focus of NutriPlotter, and its primary reason for conception and development. As such, the plate is the central point of the application for users, effectively serving as the focus of their main screen. The concept of the digital plate was introduced due to an aversion to weighing the foods out before eating, as is standard with most nutritional tracking apps. The digital plate concept was developed to avoid this, serving the dual purpose of reinforcing the “Balanced Plate” model used in recommending a healthy diet. 

### Installation
The Git repository is the central storage location for our code, amongst other things. In order to get access to the code for the project on your local device, you should run the following command in the command prompt:

```bash
    git clone http://stgit.dcs.gla.ac.uk/tp3-2018-se4/dissertation
```

This will create a local copy of the repository on your machine. If you simply want to run the app to use, this should be your only interaction with Git.

If you want to run NutriPlotter, go to the folder titled “NutriPlotter” and run the following command to install dependencies (the code libraries which must be installed prior to running the app):

```bash
    npm install
```

Note: You will need to have a command prompt window open in the “NutriPlotter” folder in order for this to work. If you run the command elsewhere, it may produce unexpected results. This also applies for the following command (to run the application), which should be run in the same directory once the dependencies have finished installing:

```bash
    expo start
```

### Resources

- official tutorial for [ReactJS](https://reactjs.org/)
- official tutorial for [Expo](https://docs.expo.io/versions/latest/)

### Contributing

- Eleonora Della    2244079D
- Matthew Smith     2260469S    
- Han Loo, Nicholas 2288527L
- Peter Macaldowie  2258785M
- Soma Froghyar     2267217F
