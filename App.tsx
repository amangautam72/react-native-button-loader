/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import ThreeDLoader from './3dLoader';

import ButtonLoader from './ButtonWithLoader';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {/* <ButtonLoader /> */}

      <ThreeDLoader />
    </View>
  );
};

export default App;
