'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TabBarIOS
} from 'react-native';
import styles from './app/styles/main';
import icons from './app/assets/icons';
import Featured from './app/components/featured';
import USBox from './app/components/USBox';
import Search from './app/components/search';
import User from './app/components/user';

export default class MovieTalk extends Component {
    constructor(props) {
      // console.log(props);
        super(props);
        this.state = {
            selectedTab: 'user'
        };
    }

    render() {
        return (
            <TabBarIOS barTintColor='darkslateblue' tintColor='white'>
                <TabBarIOS.Item // systemIcon='featured'
                    icon={{
                      uri: icons.star,
                      scale: 4.6
                    }}
                    title='Recomended Movies'
                    selectedIcon={{
                      uri: icons.starActive,
                      scale: 4.6
                    }}
                    selected={this.state.selectedTab === 'top250'} onPress={() => {
                      this.setState({selectedTab: 'top250'});
                    }}>
                      <Featured />
                </TabBarIOS.Item>

                <TabBarIOS.Item //systemIcon='most-viewed'
                    title='US Box'
                    icon={{
                      uri: icons.board,
                      scale: 4.6
                    }}
                    selectedIcon={{
                      uri: icons.boardActive,
                      scale: 4.6
                    }}
                    selected={this.state.selectedTab === 'us_box'}
                    onPress={() => {
                      this.setState({selectedTab: 'us_box'});
                    }}>
                      <Featured />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                  icon={{
                    uri: icons.search,
                    scale: 4.6
                  }}
                  title="Search"
                  selected={this.state.selectedTab === 'search'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'search'
                    });
                  }}>
                    <Search />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                  icon={{
                    uri: icons.user,
                    scale: 4.6
                  }}
                  title="Me"
                  selected={this.state.selectedTab === 'user'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'user'
                    });
                  }}>
                    <User />
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);
