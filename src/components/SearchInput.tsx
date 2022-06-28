import { StyleSheet, TextInput, SafeAreaView, View, I18nManager, useColorScheme } from 'react-native'
import React, { FC } from 'react'
import Colors from '../themes/Colors'
import Dimensions from '../themes/Dimensions'
import { useTranslation } from 'react-i18next'

interface Props {
    onChangeText: Function
}

const SearchInput: FC<Props> = ({ onChangeText }) => {
    const { t } = useTranslation()
    const lightMode = useColorScheme()
    const styles = { ...sharedStyles(lightMode) };
    return (
        <View>
            <SafeAreaView style={{ backgroundColor: lightMode == 'dark' ? Colors.black : Colors.white }} />
            <View style={styles.searchContainer} >
                <TextInput
                    onChangeText={text => onChangeText(text)}
                    style={{ color: lightMode == 'dark' ? Colors.white : Colors.black, marginStart: 5, width: '100%', textAlign: I18nManager.isRTL ? 'right' : 'left' }}
                    placeholder={t('search')}
                    placeholderTextColor={lightMode == 'dark' ? Colors.white : Colors.Gray}
                />
            </View>
        </View>
    )
}

export default SearchInput

const sharedStyles = (lightMode: any) => StyleSheet.create({
    searchContainer: {
        width: Dimensions.DEVICE_WIDTH * .9,
        borderRadius: 10,
        alignSelf: 'center',
        height: 50,
        backgroundColor: lightMode == 'dark' ? Colors.Gray : 'rgba(222,222,222,1)',
        marginTop: 10,
        paddingHorizontal: Dimensions.DEVICE_WIDTH * .03,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16
    }
})