# Glific mobile

## Getting Started

### Prerequisites

- Nodejs >=@18.16.0
- Android SDK
- Yarn >=@v1.22.19

### Setup

The following setup helps you to run the application on an android machine. Read the [documentation](https://reactnative.dev/docs/running-on-simulator-ios) of react-native to know about running it on iOS devices.

1. Clone the repository

```sh
git clone git@github.com:glific/mobile.git
```

You can also use https to clone the repository. To know more read this [documentation](https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html#clone-with-https).

2. Now change the directory by navigating into the cloned repository. Use the following command, in case of linux.

```sh
cd mobile
```

1. Create an environment file in the project's home directory with the filename `.env`, copy the contents from `.env.example` and update the key-value pairs based on the current environment the application is running in.

2. Install the dependencies using yarn.

```sh
yarn install
```

1. Start the metro server.

```sh
yarn start
```

Note that you need to connect either an android device or an emulator with your PC to run the application.

### Testing (Android phone)

- Download Expo Go app from playstore
- Scan the QR from your CLI

## Developer Guidelines

### Theme Constants Usage 
Import the project theme constants from the constants folder:
```sh
import { COLORS, SIZES, FONTS, SCALE } from '/path/to/constants';
```

Here are the project theme constants available for usage:
- **COLORS**: Contains color-related constants, ex. `COLORS.primary400`.
- **SIZES**: Includes size-related constants, ex. `SIZES.m10`, `SIZES.r4` etc.
- **FONTS**: Provides font-related constants, ex. `...FONTS.regular14`.
- **SCALE**: Offers custom scaling constants which are not included in SIZES for text and other UI elements, ex. `SCALE(100)`.

Refer to the /constants/theme.ts file containing the project theme constants.

### Naming Convention for testID and class

- For `testID` and `class` attributes used in your code, follow the camelCase naming convention.
- Use lowercase for the first letter of the attribute name and capitalize the first letter of subsequent words within the name.

Example:

```jsx
// Correct:
<View testID="myElement" className="myComponent" />

// Incorrect:
<View testID="my_element" className="my_component" />
<View testID="my element" className="my-component" />
```


Following these guidelines helps to ensure a smoother development process and easier maintenance.

If you have any questions or need further assistance, feel free to reach out to the project team. Happy coding!
