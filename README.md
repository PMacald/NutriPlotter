# NutriPlotter
# Installation

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

Note: You will need to have a command prompt window open in the “NutriPlotter” folder in order for this to work. If you run the command elsewhere, it may produce unexpected results. 

# Running the App
In the "Nutriplotter" folder, enter the following command (to run the application), which should be run in the same directory once the dependencies have finished installing:

```bash
    expo start
```

### Running NutriPlotter on mobile
This command should open a browser window with the Metro Bundler for the app. On the left side of the screen, there is a number of options for launching your app. The easiest method is using the QR code, which can be scanned by the Expo mobile application for Android or iOS. The Expo application can be found on the App Store for iOS devices and is used to launch applications developed on the Expo framework. Once you have installed the Expo application itself and opened it, you will be given the option to scan a QR code to launch an application. You can also do this without opening the Expo application first on iOS by simply holding your finger on the QR code in the Camera app.

Alternatively, you can launch the app by making an account and signing into Expo on both your mobile device and the device hosting. You will then get the option to open your project directly upon opening the Expo mobile app. Signing into Expo also gives the added benefit of providing a default phone number or email address through which to send you a link to open the application, should you choose this route.

Once you’ve either opened a link to your project, or used a QR code (they point to the same place), you should see the bundler start after a short wait. Once the bundler has completed the task of building, the app will open automatically. This can take a little time, and sometimes the percentages of completion will jump around somewhat. This isn’t cause for concern and if you let it run the process to completion, the app should open normally.


### Resources

- official tutorial for [ReactJS](https://reactjs.org/)
- official tutorial for [Expo](https://docs.expo.io/versions/latest/)

### Contributing

- Eleonora Della    2244079D
- Matthew Smith     2260469S    
- Han Loo, Nicholas 2288527L
- Peter Macaldowie  2258785M
- Soma Froghyar     2267217F
