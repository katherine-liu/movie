'use strict';

import React, {Component} from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  WebView,
  AsyncStorage,
} from 'react-native';
import styles from '../styles/main';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.api = {
      key: '',
      secret: '',
    }
    this.oAuth = {
      authBaseUrl: 'https://www.douban.com/service/auth2/auth',
      tokenBaseUrl: 'https://www.douban.com/service/auth2/token',
      redirectUri: 'https://google.com',
      responseType: 'code',
      grantType: 'authorization_code',
      scope: 'douban_basic_common, movie_basic, movie_basic_r, movie_basic_w',
    }
    this.state = {
      authCode: '',
    }
    // request url
    this.authUrl = `${this.oAuth.authBaseUrl}
      ?client_id=${this.api.key}
      &redirect_uri=${this.oAuth.redirectUri}
      &response_type=${this.oAuth.responseType}
      &scope=${this.oAuth.scope}`.replace(/(\r\n|\n\r| )/gm, '');
  }

  getToken() {
    let tokenUrl = `${this.oAuth.authBaseUrl}
      ?client_id=${this.api.key}
      &client_secret=${this.api.secret}
      &redirect_uri=${this.oAuth.redirectUri}
      &grant_type=${this.oAuth.responseType}
      &code=${this.state.authCode}`.replace(/(\r\n|\n\r| )/gm, '');
      fetch(tokenUrl, {
        method: 'POST',
        body: `client_id=${this.api.key}`
      })
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData);
            AsyncStorage.setItem('token', JSON.stringify(responseData));
            console.log('get token');
        })
        .then(() => {
            this.props.navigator.pop();
            console.log('navigator pop back');
        })
        .done();
  }

  async onNavigationStateChange(navState) {
    if (navState.url.includes('?code=') && navState.navigationType === 1) {
        let code = navState.url.split('code=')[1];
        await this.setState({
            authCode: code
        });
        console.log(this.state.authCode);
    }
  }

  render() {
    return (
      <WebView
        // source={{uri: "https://google.com"}}
        // source={{html: "<pre>let siteName = 'ninghao.net'</pre>"}}
        source={{uri: this.authUrl}}
        startInLoadingState={true}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        // bounces={false}
        // scrollEnable={true}
        // contentInset={{top: 1, right: 1, bottom: 1, left: 1}}
      />
    );
  }
}

export { Login as default };
