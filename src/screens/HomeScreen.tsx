import { ActivityIndicator, Alert, Button, I18nManager, StyleSheet, Text, useColorScheme, View } from 'react-native'
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
    const [loading, setLoading] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const { t } = useTranslation()
    const [page, setPage] = useState<number>(1)
    const lightMode = useColorScheme()
    const styles = { ...sharedStyles(lightMode) };

    useEffect(() => {
        getAllNews(1)
    }, [])


    const getAllNews = (page: number, searchword: string = ''): void => {
        setLoading(true)
        axiosApi.get(`/news/all`, {
            params: {
                search: searchword ?? '',
                language: I18nManager.isRTL ? 'ar' : 'en',
                page: page
            }
        })
            .then(response => {
                console.log(response.data)
                setLoading(false)
                setRefreshing(false)
                const articles = response.data?.data
                if (page > 1) {
                    setNews(prv => [...prv, ...articles])
                }
                else {
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
        getAllNews(1)
    }


    return (
        <View style={styles.container}>
            <SearchInput onChangeText={(word: any) => {
                setPage(1)
                getAllNews(1, word)
            }} />
            {!loading && news.length == 0 &&
                <Text style={styles.notFound} >
                    {t('no_news')}
                </Text>}
            {loading && page == 1 && <ActivityIndicator size='large' color={Colors.Gray} />}
            <NewsList
                ListFooterComponent={loading && page > 1 && <ActivityIndicator size='small' color={Colors.Gray} />}
                refreshing={refreshing}
                onRefresh={onRefresh}
                data={news}
                loadMore={() => {
                    getAllNews(page + 1)
                    setPage(prv => prv + 1)
                }} />

        </View>
    )
}

export default HomeScreen

const sharedStyles = (lightMode: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightMode == 'dark' ? Colors.black : Colors.white
    },
    notFound: {
        fontSize: 16,
        marginTop: Dimensions.DEVICE_HEIGHT * .4,
        alignSelf: 'center'
    }
})