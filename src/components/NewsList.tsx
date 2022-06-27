import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useContext } from 'react'
import { Article } from '../types'
import NewsItem from './NewsItem'


interface Props {
    data: Article[],
    loadMore: Function
}

const NewsList: FC<Props> = ({ data, loadMore }) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <NewsItem {...item} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.9}
        />
    )
}

export default NewsList

const styles = StyleSheet.create({})