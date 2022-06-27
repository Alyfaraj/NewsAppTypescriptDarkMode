import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { axiosApi } from '../network'
import axios from 'axios'
import { Article } from '../types'
import NewsList from '../components/NewsList'
import SearchInput from '../components/SearchInput'

const HomeScreen = () => {
    const [news, setNews] = useState<Article[]>([])
    const [searchword, setSearchword] = useState<string>('')

   

    useEffect(() => {
        getAllNews()
    }, [searchword])


    const getAllNews = (): void => {
        axiosApi.get(`/top-headlines`, {
            params: {
                q: searchword ?? '',
                language: 'en'
            }
        })
            .then(response => {
                console.log(response.data)
                const articles = response.data?.articles
                if (articles) {
                    setNews(articles)
                }
            })
            .catch(err => Alert.alert(err.response.data?.message))
    }



    return (
        <View style={styles.container} >
            <SearchInput onChangeText={setSearchword} />
            <NewsList data={news} loadMore={() => { }} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})