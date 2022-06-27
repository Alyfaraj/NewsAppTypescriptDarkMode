import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { FC, useContext } from 'react'
import { Article } from '../types'
import NewsItem from './NewsItem'


interface Props {
    data: Article[],
    loadMore: Function,
    onRefresh:Function,
    refreshing:boolean
}

const NewsList: FC<Props> = ({ data, loadMore,onRefresh,refreshing }) => {
    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh()} />}
            data={data}
            renderItem={({ item }) => <NewsItem {...item} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.9}
        />
    )
}

export default NewsList

const styles = StyleSheet.create({})