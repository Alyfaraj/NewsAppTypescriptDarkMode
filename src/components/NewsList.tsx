import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { Component, FC, useContext } from 'react'
import { Article } from '../types'
import NewsItem from './NewsItem'


interface Props {
    data: Article[],
    loadMore: Function,
    onRefresh:Function,
    refreshing:boolean,
    ListFooterComponent:any
}

const NewsList: FC<Props> = ({ data, loadMore,onRefresh,refreshing,ListFooterComponent }) => {
    return (
        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>onRefresh()} />}
            data={data}
            renderItem={({ item }) => <NewsItem {...item} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.8}
            onEndReached={()=>loadMore()}
            ListFooterComponent={ListFooterComponent}
        />
    )
}

export default NewsList

const styles = StyleSheet.create({})