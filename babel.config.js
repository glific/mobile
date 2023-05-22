// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       [
//         'module:react-native-dotenv',
//         'react-native-reanimated/plugin',
//       ],
//         {
//           moduleName: '@env',
//           path: '.env',
//           blacklist: null,
//           whitelist: null,
//           safe: false,
//           allowUndefined: true,
          
//         },
     
//     ],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
