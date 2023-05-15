# Glific mobile

## Getting Started

### Prerequisites
* Nodejs >=@18.16.0
* Android SDK
* Yarn >=@v1.22.19

### Setup

The following setup helps you to run the application on an android machine. Read the [documentation](https://reactnative.dev/docs/running-on-simulator-ios) of react-native to know about running it on iOS devices.

1) Clone the repository
```sh
git clone git@github.com:glific/mobile.git
```
You can also use https to clone the repository. To know more read this [documentation](https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html#clone-with-https).

2) Now change the directory by navigating into the cloned repository. Use the following command, in case of linux.
```sh
cd mobile
```

1) Create an environment file in the project's home directory with the filename `.env`, copy the contents from `.env.example` and update the key-value pairs based on the current environment the application is running in.

2) Install the dependencies using yarn.
```sh
yarn install
```

1) Start the metro server.
```sh
yarn start
```

Note that you need to connect either an android device or an emulator with your PC to run the application.

### Testing (Android phone)

- Download Expo Go app from playstore
- Scan the QR from your CLI
