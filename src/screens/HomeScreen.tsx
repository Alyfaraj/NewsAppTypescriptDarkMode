import { ActivityIndicator, Alert, Button, I18nManager, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { axiosApi } from '../network'
import axios from 'axios'
import { Article } from '../types'
import NewsList from '../components/NewsList'
import SearchInput from '../components/SearchInput'
import Colors from '../themes/Colors'
import Dimensions from '../themes/Dimensions'
import { ChangeLangugae } from '../i18n'
import { useTranslation } from 'react-i18next'

const HomeScreen = () => {
    const [news, setNews] = useState<Article[]>([])
    const [searchword, setSearchword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const {t}=useTranslation()
    
    useEffect(() => {
        getAllNews()
    }, [searchword])


    const getAllNews = (): void => {
        setLoading(true)
        axiosApi.get(`/top-headlines`, {
            params: {
                q: searchword ?? '',
                language: I18nManager.isRTL ? 'ar' : 'en'
            }
        })
            .then(response => {
                setLoading(false)
                setRefreshing(false)
                const articles = response.data?.articles
                if (articles) {
                    setNews(articles)
                }
            })
            .catch(err => {
                setLoading(false)
                Alert.alert(err.response.data?.message)
            })
    }


    const onRefresh = (): void => {
        setRefreshing(true)
        getAllNews()

    }


    return (
        <View style={styles.container}>
            <SearchInput onChangeText={setSearchword} />
            <Button title={t('change_language')} onPress={()=>ChangeLangugae()} />
            {!loading && news.length == 0 &&
                <Text style={styles.notFound} >
                    {searchword ?t('no_result') : t('no_news')}
                </Text>}
            {loading ? <ActivityIndicator size='large' color={Colors.Gray} />
                : <NewsList refreshing={refreshing} onRefresh={onRefresh} data={news} loadMore={() => { }} />
            }
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    notFound: {
        fontSize: 16,
        marginTop: Dimensions.DEVICE_HEIGHT * .4,
        alignSelf: 'center'
    }
})