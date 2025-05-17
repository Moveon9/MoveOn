/**
 * @format
 */

import 'react-native-gesture-handler'; // ❗️반드시 가장 먼저
import 'react-native-reanimated';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
