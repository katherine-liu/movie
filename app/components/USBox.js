'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  NavigatorIOS
}from 'react-native';
import styles from '../styles/main';
import USBoxList from './USBoxList';

class USBox extends React.Component {
    render() {
        return (
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: "US Box",
              component: USBoxList
            }}
            shadowHidden
            barTintColor="darkslateblue"
            titleTextColor="rgba(255, 255, 255, 0.8)"
            tintColor="rgba(255, 255, 255, 0.8)"
            translucent/>
          );
    }
}

export {USBox as default};
