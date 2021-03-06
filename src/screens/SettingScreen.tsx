import { SafeAreaView, StyleSheet, Text, View, Pressable, useColorScheme } from 'react-native'
import React from 'react'
import { ChangeLangugae } from '../i18n'
import { useTranslation } from 'react-i18next'
import Colors from '../themes/Colors'

const SettingScreen = () => {
  const { t } = useTranslation()
  const lightMode = useColorScheme()
  const styles = { ...sharedStyles(lightMode) };

  const onChangePress = (): void => {
    ChangeLangugae()
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Pressable style={styles.textContainer} onPress={onChangePress} >
          <Text style={styles.language} >{t('language')}</Text>
          <Text style={styles.changeLanguage} >{t('change_language')}</Text>
        </Pressable>
      </SafeAreaView>

    </View>
  )
}

export default SettingScreen

const sharedStyles = (lightMode:any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightMode == 'dark' ? Colors.black : Colors.white
},
  textContainer: {
    marginStart: 20,
    alignSelf: 'flex-start'
  },
  language: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.primary,
    textAlign: 'left'
  },
  changeLanguage: {
    fontSize: 16,
    color: lightMode == 'dark' ? Colors.white : Colors.black,
    marginTop: 2,
    textAlign: 'left',

  }
})