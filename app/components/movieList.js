'use strict';

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ListView,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import styles from '../styles/main';
import MovieDetail from './movieDetail';

// const REQUEST_URL = 'https://facebook.github.io/react-native/movies.json';
// const REQUEST_URL = 'https://api.douban.com/v2/movie/top250';
class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loaded: false,
            count: 20,
            start: 0,
            total: 0,
        };
        this.REQUEST_URL = 'https://api.douban.com/v2/movie/top250';
        this.fetchData();
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        })
    }

    requestURL(
      url = this.REQUEST_URL,
      count = this.state.count,
      start = this.state.start,) {
      return(
        `${url}?count=${count}&start=${start}`
      )
    }

    fetchData() {
        return fetch(this.requestURL())
          .then(response => response.json())
          .then(responseData => {
            // console.log(responseJson);
            this.setState({
                movies: responseData.subjects,
                loaded: true,
                count: 20,
                start: responseData.start + responseData.count,
                total: responseData.total,
                // total: responseData.total,
            })
          })
        .catch((error) => {
            console.error(error);
          })
        .done();

        // Using XMLHttpRequest API:
        // var request = new XMLHttpRequest();
        // request.onreadystatechange = (e) => {
        //   if (request.readyState !== 4) {
        //     return;
        //   }
        //
        //   if (request.status === 200) {
        //     console.log('success', request.responseText);
        //   } else {
        //     console.warn('error');
        //   }
        // };
        //
        // request.open('GET', REQUEST_URL);
        // request.send();
    }

    loadMore() {
      fetch(this.requestURL())
        .then(response => response.json())
        .then(responseData => {
          this.setState({
            movies: [...this.state.movies, ...responseData.subjects],
            start: responseData.start + responseData.count,
          })
        })
        .done();
    }

    showMovieDetail(movie) {
        this.props.navigator.push({
            title: movie.title,
            component: MovieDetail,
            passProps: {movie}
          });
    }

    renderMovieList(movie) {
        return (
            <TouchableHighlight
              underlayColor='rgba(34, 26, 38, 0.1)'
              onPress={() => {
                this.showMovieDetail(movie) // console.log(`${movie.title}`);
              }}>
                <View style={styles.item}>
                    <View style={styles.itemImage}>
                        <Image source={{
                            uri: movie.images.large
                        }} style={styles.image}/>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemheader}>{movie.title}</Text>
                        <Text style={styles.itemMeta}>{movie.original_title}({movie.year})</Text>
                        <Text style={styles.redText}>{movie.rating.average}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    onEndReached() {
      // console.log(
      //   `Start: ${this.state.start}, Total: ${this.state.total}`
      // )
      if(this.state.total > this.state.start) {
        this.loadMore();
      }
    }

    renderFooter() {
      if (this.state.total > this.state.start) {
        return(
          <View style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center',
          }}>
            <ActivityIndicator />
          </View>
        );
      } else {
        return(
          <View style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center',
          }}>
            <Text
              style={{
                color: 'rgba(0, 0, 0, 0.3)'
              }}>No More Movies :)
              </Text>
          </View>
        );
      }
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#6435c9"/>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[styles.container, {marginTop: 20}]}>
                    <ListView
                      initialListSize={this.state.count}
                      pageSize={this.state.count}
                      dataSource={this.dataSource.cloneWithRows(this.state.movies)}
                      renderRow={this.renderMovieList.bind(this)}
                      onEndReached={this.onEndReached.bind(this)}
                      renderFooter={this.renderFooter.bind(this)}
                    />
                </View>
            );
        }
    }
}

class HeaderText extends React.Component {
    render() {
        return (
            <Text style={styles.itemText}>
                {this.props.children}
            </Text>
        );
    }
}

export {MovieList as default};
