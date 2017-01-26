'use strict';

import React, {Component} from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  AsyncStorage,
  PixelRatio,
} from 'react-native';
import styles from '../styles/main';
import Login from './login';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: {
          avatar: '../assets/logo_og.png',
          name: 'Katherine Liu',
          desc: 'Design Queue :)',
      },
      loaded: false,
    }
    // this.login();
  }

  getCurrentUser() {
      console.log('get user info');
      let REQUEST_USER_URL = 'https://api.douban.com/v2/user/~me';
      fetch(REQUEST_USER_URL, {
          headers: {
              'Authorization': `Bearer ${this.state.token}`
          }
      })
        .then(response => response.json())
        .then(responseData => {
            this,setState({
                user: responseData,
                loaded: true,
            });
        })
        .then(() => {
            console.log(this.state.user);
        })
        .done();
  }

  redirectToLogin() {
    this.props.navigator.push({
      title: 'Login',
      component: Login,
    })
  }

  // componentWillUpdate() {
  //     if (!this.state.token) {
  //         AsyncStorage.getItem('token')
  //           .then((token) => {
  //               this.setState({
  //                   token: JSON.parse(token).access_token
  //               });
  //           })
  //           .then(() => {
  //               if (this.state.token) {
  //                   this.getCurrentUser();
  //               }
  //           });
  //     }
  // }

  login() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          this.setState({
            token: JSON.parse(token).access_token
          })
        }
      })
      .then(() => {
        if (this.state.token) {
            console.log('has token');
            this.getCurrentUser();
        }
      })
      .then(() => {
          if (!this.state.token) {
              console.log('hasn\'t token');
              this.redirectToLogin();
          }
      });
  }

  logout() {
      AsyncStorage.removeItem('token')
        .then(() => {
            this.setState({
                token: '',
                user: {},
                loaded: false,
            });
        })
        .then(() => {
            this.login();
        });
  }

  render() {
      if (!this.state.loaded) {
          return (
              <View style={styles.container}>
                  <View style={styles.loading}>
                      <ActivityIndicator
                          size="large"
                          color="#643ec9"
                      />
                  </View>
              </View>
          );
      } else {
          return (
          //   <Login />
            <View style={[styles.container, {
                flexDirection: 'column',
                paddingTop: 160
            }]}>
              <View style={{flex: 1, alignSelf: 'center'}}>
                  <Image
                      source={require('../assets/logo_og.png')}
                      // source={{uri: this.state.user.avatar}}
                      style={{
                          width: 90,
                          height: 90,
                          borderRadius: 90 / PixelRatio.get(),
                          alignSelf: 'center',
                      }}
                  />
                  <Text
                      style={{
                          marginVertical: 15,
                          fontSize: 18,
                          textAlign: 'center',
                      }}>{this.state.user.name}</Text>

                      <Text style={{
                          color: 'rgba(0, 0, 0, 0.6)',
                          marginBottom: 10,
                          textAlign: 'center',
                      }}>
                          {this.state.user.desc}
                      </Text>
              </View>

              <TouchableHighlight
                  underlayColor="rgba(34, 26, 38, 0.1)"
                  onPress={() => this.logout()}
                  style={{
                      margin: 10,
                      justifyContent: 'flex-end',
                      marginBottom: 90,
                  }}
              >
                  <View style={{
                      backgroundColor: '#9182E6',
                      borderRadius: 3,
                      padding: 8
                  }}>
                      <Text style={{
                          textAlign: 'center',
                          color: 'rgba(255, 255, 255, 0.9)'
                      }}>Log Out</Text>
                  </View>
              </TouchableHighlight>
            </View>
          );
      }
  }
}

export { UserProfile as default };
