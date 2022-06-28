import { Alert, I18nManager, Image, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { axiosApi } from '../network'
import { Article } from '../types'
import Dimensions from '../themes/Dimensions'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import Colors from '../themes/Colors'

interface Props {
    route: any
}

const DeatilsScreen: FC<Props> = ({ route }) => {
    const { articleTitle } = route.params
    const [article, setArticle] = useState<Article>()
    const { t } = useTranslation()
    const lightMode = useColorScheme()
    const styles = { ...sharedStyles(lightMode) };

    // PLEASE NOTE 
    // newsapis.org not provide get article details with id 
    //so we will use title (not a good option) 
    //but I will use it becouse I need add deep linking later   
    const getArticleDetails = (): void => {
        axiosApi.get(`/top-headlines`, {
            params: {
                q: articleTitle,
                language: I18nManager.isRTL ? 'ar' : 'en'
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
        <ScrollView style={styles.container} >
            <Image style={styles.image} source={{ uri: article?.urlToImage }} />
            <View style={{ marginHorizontal: 15 }} >
                <Text style={styles.title} >{article?.title}</Text>
                <Text style={styles.date} >{t('publish_at')}: {moment(article?.publishedAt).format('LLL')}</Text>
                {article?.author && <Text style={styles.author} >{t('author')} : <Text style={{ fontWeight: "700" }} >{article?.author}</Text></Text>}
                <Text style={styles.source} >{t('source')} : {article?.source.name}</Text>
                <Text style={styles.description} >{article?.description} {'\n \n'} {article?.content}</Text>
            </View>
        </ScrollView>
    )
}

export default DeatilsScreen

const sharedStyles = (lightMode: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightMode == 'dark' ? Colors.black : Colors.white
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
        marginVertical: 20,
        textAlign: 'left',
        color: lightMode == 'dark' ? Colors.white : Colors.black
    },
    description: {
        width: Dimensions.DEVICE_WIDTH * .94,
        marginVertical: 16,
        alignSelf: 'center',
        fontSize: 15,
        textAlign: 'left',
        color: lightMode == 'dark' ? Colors.white : Colors.black
    },
    source: {
        fontSize: 18,
        opacity: .6,
        marginTop: 10,
        textAlign: 'left',
        color: lightMode == 'dark' ? Colors.white : Colors.black
    },
    date: {
        marginTop: 10,
        fontSize: 14,
        textAlign: 'left',
        color: lightMode == 'dark' ? Colors.white : Colors.black
    },
    author: {
        marginTop: 10,
        fontSize: 14,
        textAlign: 'left',
        color: lightMode == 'dark' ? Colors.white : Colors.black

    }
})