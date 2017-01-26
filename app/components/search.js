'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    NavigatorIOS
} from 'react-native';
import styles from '../styles/main';
import SearchForm from './searchForm';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Search',
          component: SearchForm
        }}
        shadowHidden={true}
        barTintColor="darkslateblue"
        titleTextColor="rgba(255, 255, 255, 0.8)"
        tintColor="rgba(255, 255, 255, 0.8)"
        translucent />
      );
  }
}

export { Search as default };
