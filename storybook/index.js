"use strict";
/* eslint-disable global-require */
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
configure(function () {
    require('../build/stories');
}, module);

var StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
AppRegistry.registerComponent('crimpMonkey', function () { return StorybookUI; });
export default StorybookUI;
//# sourceMappingURL=index.js.map
