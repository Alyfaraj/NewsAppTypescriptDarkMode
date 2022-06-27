import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native'
import React, { FC } from 'react'
import { Article } from '../types'
import Dimensions from '../themes/Dimensions'

const NewsItem: FC<Article> = (article) => {
    return (
        <Pressable>
            <ImageBackground imageStyle={{ borderRadius: 15, resizeMode: 'cover' }} style={styles.image} source={{ uri: article.urlToImage }} >
                <View style={styles.headlineContainer} >
                    <Text style={styles.title} >{article.title}</Text>
                    <Text style={styles.source} >source : {article.source.name}</Text>
                </View>
            </ImageBackground>
        </Pressable>
    )
}

export default NewsItem

const styles = StyleSheet.create({
    image: {
        width: Dimensions.DEVICE_WIDTH * .9,
        height: 170,
        borderRadius: 15,
        alignSelf: 'center',
        marginBottom: 16,
        shadowOpacity: .1,
        backgroundColor: '#ccc'
    },
    headlineContainer: {
        position: 'absolute',
        bottom: 20,
        start: 0,
        backgroundColor: 'rgba(0,0,0,.4)',
        padding: 7,
        borderTopEndRadius: 3
    },
    title: {
        fontWeight: '600',
        fontSize: 12,
        color: 'white',
        maxWidth: Dimensions.DEVICE_WIDTH * .7,
        marginBottom: 5
    },
    source: {
        fontSize: 10,
        color: 'white',
        maxWidth: Dimensions.DEVICE_WIDTH * .7,
        opacity: .8
    }
})