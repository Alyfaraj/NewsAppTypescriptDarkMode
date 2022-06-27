import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { axiosApi } from '../network'
import { Article } from '../types'
import Dimensions from '../themes/Dimensions'
import moment from 'moment'

interface Props {
    route: any
}

const DeatilsScreen: FC<Props> = ({ route }) => {
    const { articleTitle } = route.params
    const [article, setArticle] = useState<Article>()


    // PLEASE NOTE 
    // newsapis.org not provide get article details with id 
    //so we will use title (not good option) 
    //but I will use it becouse I need add deep linking later   
    const getArticleDetails = (): void => {
        axiosApi.get(`/top-headlines`, {
            params: {
                q: articleTitle,
                language: 'en'
            }
        })
            .then(response => {
                const article = response.data?.articles[0]
                setArticle(article)
            })
            .catch(err => {
                Alert.alert(err.response.data?.message)
            })
    }

    useEffect(() => {
        getArticleDetails()
    }, [])

    return (
        <View style={styles.container} >
            <Image style={styles.image} source={{ uri: article?.urlToImage }} />
            <View style={{ marginHorizontal: 15 }} >
                <Text style={styles.title} >{article?.title}</Text>
                <Text style={styles.date} >Publish at : {moment(article?.publishedAt).format('LLL')}</Text>
                {article?.author && <Text style={styles.author} >Author : <Text style={{ fontWeight: "700" }} >{article?.author}</Text></Text>}
                <Text style={styles.source} >source : {article?.source.name}</Text>
                <Text style={styles.description} >{article?.description} {'\n \n'} {article?.content}</Text>
            </View>
        </View>
    )
}

export default DeatilsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        width: Dimensions.DEVICE_WIDTH,
        height: 300,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15

    },
    title: {
        maxWidth: Dimensions.DEVICE_WIDTH * .7,
        fontWeight: '600',
        fontSize: 17,
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginVertical: 20
    },
    description: {
        width: Dimensions.DEVICE_WIDTH * .94,
        marginVertical: 16,
        alignSelf: 'center',
        fontSize: 15
    },
    source: {
        fontSize: 18,
        opacity: .6,
        marginTop: 10
    },
    date: {
        marginTop: 10,
        fontSize: 14
    },
    author: {
        marginTop: 10,
        fontSize: 14
    }
})