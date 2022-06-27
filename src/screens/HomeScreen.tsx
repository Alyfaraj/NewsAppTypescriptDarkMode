import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { axiosApi } from '../network'
import axios from 'axios'
import { Article } from '../types'
import NewsList from '../components/NewsList'
import SearchInput from '../components/SearchInput'
import Colors from '../themes/Colors'

const HomeScreen = () => {
    const [news, setNews] = useState<Article[]>([])
    const [searchword, setSearchword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        getAllNews()
    }, [searchword])


    const getAllNews = (): void => {
        setLoading(true)
        axiosApi.get(`/top-headlines`, {
            params: {
                q: searchword ?? '',
                language: 'en'
            }
        })
            .then(response => {
                setLoading(false)
                console.log(response.data)
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



    return (
        <View style={styles.container}>
            <SearchInput onChangeText={setSearchword} />
            {loading ? <ActivityIndicator size='large' color={Colors.Gray} />
                : <NewsList data={news} loadMore={() => { }} />}
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

    }
})