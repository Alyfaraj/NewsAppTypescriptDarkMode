import { ActivityIndicator, Alert, I18nManager, Image, Pressable, ScrollView, Share, StyleSheet, Text, useColorScheme, View } from 'react-native'
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
    const { id } = route.params
    const [article, setArticle] = useState<Article>()
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)
    const lightMode = useColorScheme()
    const styles = { ...sharedStyles(lightMode) };


    const onSharePress = (): void => {
        Share.share({
            title: article?.title,
            url: `demo://app/home/news/${id}`
        })
    }


    const getArticleDetails = (): void => {
        setLoading(true)
        axiosApi.get(`/news/uuid/${id}`, {
            params: {}
        })
            .then(response => {
                setLoading(false)
                const article = response.data
                console.log(article.description)
                setArticle(article)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        getArticleDetails()
    }, [])

    return (
        <ScrollView style={styles.container} >
            {loading ? <ActivityIndicator style={{ marginTop: Dimensions.DEVICE_HEIGHT * .5 }} color={Colors.Gray} size='large' /> :
                <>
                    <Image style={styles.image} source={{ uri: article?.image_url }} />
                    <View style={{ marginHorizontal: 15 }} >
                        <View style={styles.row} >
                            <Text style={styles.title} >{article?.title}</Text>
                            <Pressable onPress={onSharePress} >
                                <Image source={require('../assets/images/shareicon.png')} style={styles.share} />
                            </Pressable>
                        </View>
                        <Text style={styles.date} >{t('publish_at')}: {moment(article?.published_at).format('LLL')}</Text>
                        {article?.author && <Text style={styles.author} >{t('author')} : <Text style={{ fontWeight: "700" }} >{article?.author}</Text></Text>}
                        <Text style={styles.source} >{t('source')} : {article?.source}</Text>
                        <Text style={styles.description} >{article?.description}</Text>
                    </View>
                </>
            }
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

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    share: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
        tintColor: Colors.primary
    }
})