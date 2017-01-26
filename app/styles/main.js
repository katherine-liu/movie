'use strict';

import React from 'react-native';
let {StyleSheet} = React;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#eae7ff',
        paddingTop: 23
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(100, 53, 201, 0.1)',
        paddingBottom: 6,
        paddingTop: 6
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: 'rgba(0, 0, 0, 0.8)',
        lineHeight: 26
    },
    itemContent: {
        flex: 1,
        marginLeft: 13,
        marginTop: 6
    },
    itemHeader: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#6435c9',
        marginBottom: 6
    },
    itemMeta: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.6)',
        marginBottom: 6
    },
    redText: {
        color: '#db2828',
        fontSize: 15
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    image: {
        width: 99,
        height: 138,
        margin: 6
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center'
    },
    overlayHeader: {
        fontSize: 33,
        fontFamily: 'Helvetica Neue',
        fontWeight: '200',
        color: '#eae7ff',
        padding: 10
    },
    overlaySubHeader: {
        fontSize: 16,
        fontFamily: 'Helvetica Neue',
        fontWeight: '200',
        color: '#eae7ff',
        padding: 10,
        paddingTop: 0
    }
});

export {styles as default};
