'use strict';

import React, {Component} from 'react';
import {
  ActivityIndicator,
  NavigatorIOS,
  View,
  Text,
  TextInput,
} from 'react-native';
import styles from '../styles/main';
import SearchResult from './searchResult';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      loaded: true,
      opacity: 0,
    };
  }

  fetchData() {
    this.setState({
      loaded: false,
      opacity: 1,
    });
    const REQUEST_URL = `https://api.douban.com/v2/movie/search?q=${this.state.query}`
    return fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData);
        this.setState({
          loaded: true,
          opacity: 0,
        });
        this.props.navigator.push({
          title: responseData.title,
          component: SearchResult,
          passProps: {
            results: responseData,
            query: this.state.query,
          }
        });
      })
      .done();
  }

  render() {
    return (
      <View style={[styles.container, {paddingTop: 60}]}>
        <View style={{
          paddingTop: 7,
          paddingLeft: 7,
          paddingRight: 7,
          borderColor: "rgba(100, 53, 201, 0.1)",
          borderBottomWidth: 1,
        }}>
          <TextInput
            style={{width: 360, height: 50}}
            placeholder="Search ..."
            placeholderTextColor="#6435c9"
            // autoFocus
            autoCorrect
            editable
            secureTextEntry={false}
            multiline={false}
            // defaultValue="The Truman Show"
            // keyboardType="numeric"
            // keyboardType="email-address"
            // keyboardType="url"
            // keyboardType="web-search"
            // clearTextOnFocus
            clearButtonMode="while-editing"
            // clearButtonMode="never"
            // clearButtonMode="always"
            // clearButtonMode="unless-editing"
            // enablesReturnKeyAutomatically
            returnKeyType="search"
            // onFocus={() => console.log('onFocus')}
            // onBlur={() => console.log('onBlur')}
            // onChange={() => console.log('onChange')}
            onChangeText={(query) => {
              this.setState({
                query: query
              });
            }}
            // onEndEditing={() => console.log('onEndEditing')}
            onSubmitEditing={this.fetchData.bind(this)}
            />
            <ActivityIndicator
              animating={!this.state.loaded}
              size="large"
              color="#6435c9"
              style={{
                position: 'absolute',
                right: 10,
                top: 20,
                opacity: this.state.opacity
              }}
            />
        </View>
      </View>
    );
  }
}

export { SearchForm as default };
