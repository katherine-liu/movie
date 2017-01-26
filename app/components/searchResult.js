'use strict';

import React, {Component} from 'react';
import {
  View,
  ListView,
  Text,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import styles from '../styles/main';
import MovieDetail from './movieDetail';

class SearchResult extends Component {
  constructor(props){
    super(props);
    // console.log(this.props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      movies: this.props.results.subjects,
      total: this.props.results.total,
      start: this.props.results.start,
      count: this.props.results.count,
      query: this.props.query,
    }
    this.REQUEST_URL = 'https://api.douban.com/v2/movie/search'
  }

  requestURL(
    url = this.REQUEST_URL,
    start = this.state.start,
    count = this.state.count,
    query = this.state.query,) {
    return (
      `${url}?q=${query}&count=${count}&start=${start}`
    )
  }

  loadMore() {
    fetch(this.requestURL())
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
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
    if (this.state.total > this.state.start) {
      this.loadMore();
    }
  }

  renderFooter() {
    if (this.state.total > this.state.start) {
      return(
        <View
          style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      return(
        <View
          style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center',
          }}
        >
          <Text
            style={{
              color: 'rgba(0, 0, 0, 0.3)'
            }}>Nor More Movies :)
          </Text>
        </View>
      );
    }
  }

  render() {
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

export { SearchResult as default };
