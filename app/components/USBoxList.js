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
const REQUEST_URL = 'https://api.douban.com/v2/movie/us_box';
// const REQUEST_URL = 'https://api.douban.com/v2/movie/top250';

class USBoxList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        };

        this.fetchData();
    }

    fetchData() {
        return fetch(REQUEST_URL).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            this.setState({
                movies: this.state.movies.cloneWithRows(responseJson.subjects),
                loaded: true
            })
        }).catch((error) => {
            console.error(error);
        }).done();

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

    showMovieDetail(movie) {
      this.props.navigator.push({
        title: movie.title,
        component: MovieDetail,
        passProps: {movie},
      });
    }

    renderMovieList(movie) {
        return (
            <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)"
            onPress={() => this.showMovieDetail(movie.subject)}
              >
                <View style={styles.item}>
                    <View style={styles.itemImage}>
                        <Image source={{
                            uri: movie.subject.images.large
                        }} style={styles.image}/>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemheader}>{movie.subject.title}</Text>
                        <Text style={styles.itemMeta}>{movie.subject.original_title}({movie.subject.year})</Text>
                        <Text style={styles.redText}>{movie.subject.rating.average}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
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
                <View style={styles.container}>
                    <ListView dataSource={this.state.movies} renderRow={this.renderMovieList.bind(this)}/>
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

export { USBoxList as default };
