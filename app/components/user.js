'use strict';

import React, {Component} from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  NavigatorIOS,
} from 'react-native';
import styles from '../styles/main';
import UserProfile from './userProfile';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: "Me",
          component: UserProfile
        }}
        shadowHidden
        barTintColor="darkslateblue"
        titleTextColor="rgba(255, 255, 255, 0.8)"
        tintColor="rgba(255, 255, 255, 0.8)"
        translucent/>
    );
  }
}

export { User as default };
