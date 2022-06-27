import { StyleSheet, TextInput, SafeAreaView, View } from 'react-native'
import React, { FC } from 'react'
import Colors from '../themes/Colors'
import Dimensions from '../themes/Dimensions'

interface Props {
    onChangeText: Function
}

const SearchInput: FC<Props> = ({  onChangeText }) => {
    return (
        <View>
            <SafeAreaView style={{ backgroundColor: Colors.white }} />
            <View style={styles.searchContainer} >
                <TextInput
                    onChangeText={text=>onChangeText(text)}
                    style={{ color: Colors.black, marginStart: 5 }}
                    placeholder='Search'
                    placeholderTextColor={Colors.Gray}
                />
            </View>
        </View>
    )
}

export default SearchInput

const styles = StyleSheet.create({
    searchContainer: {
        width: Dimensions.DEVICE_WIDTH * .9,
        borderRadius: 10,
        alignSelf: 'center',
        height: 50,
        backgroundColor: 'rgba(222,222,222,1)',
        marginTop: 10,
        paddingHorizontal: Dimensions.DEVICE_WIDTH * .03,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16
    }
})