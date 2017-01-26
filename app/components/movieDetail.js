'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  NavigatorIOS,
  ActivityIndicator
} from 'react-native';
import styles from '../styles/main';

class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`
        this.state = {
            movieDetail: '',
            loaded: false
        };
        this.fetchData(REQUEST_URL);
    }
    fetchData(REQUEST_URL) {
        fetch(REQUEST_URL).then(response => response.json()).then(responseData => {
            this.setState({movieDetail: responseData, loaded: true});
        })
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
            let movieDetail = this.state.movieDetail;
            let summary = movieDetail.summary.split(/\n/).map((p, i) => {
                return (
                    <View style={{
                        marginBottom: 15,
                        paddingLeft: 6,
                        paddingRight: 6
                    }} key={i}>
                        <Text style={styles.itemText}>{p}</Text>
                    </View>
                );
            });
            return (
                <View style={[
                    styles.container, {
                        paddingTop: 70
                    }
                ]}>
                    <View style={[
                        styles.item, {
                            flexDirection: 'column'
                        }
                    ]}>
                        {summary}
                    </View>
                </View>
            );
        }
    };
}
export {MovieDetail as default}
