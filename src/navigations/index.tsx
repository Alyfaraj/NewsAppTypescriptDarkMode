import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { DeatilsScreen, HomeScreen, SettingScreen } from "../screens";
import { Image, StyleSheet, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";
import Colors from "../themes/Colors";

const tab = createBottomTabNavigator()
const HomeStack = createStackNavigator()
const SettingStack = createStackNavigator()

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="DeatilsScreen"
                component={DeatilsScreen}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    )
}

const SettingStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <SettingStack.Screen
                name="Setting"
                component={SettingScreen}
                options={{ headerShown: false }}
            />
        </HomeStack.Navigator>
    )
}

const Main = () => {
    const { t } = useTranslation()
    const lightMode = useColorScheme()

    return (
        <NavigationContainer>
            <tab.Navigator

                tabBarOptions={{
                    style: { backgroundColor: lightMode == 'dark' ? Colors.black : Colors.white },
                    activeTintColor: Colors.primary,
                    inactiveTintColor: '#ccc',
                }}
            >
                <tab.Screen
                    name="HomeStack"
                    component={HomeStackScreen}
                    options={{
                        title: t('news'),
                        tabBarIcon: ({ focused }) =>
                            <Image
                                source={require('../assets/images/homeicon.png')}
                                style={[styles.tabImage, { tintColor: focused ? Colors.primary : '#ccc' }]}
                            />,
                    }}

                />
                <tab.Screen
                    name="SettingStackScreen"
                    component={SettingStackScreen}
                    options={{
                        title: t('settings'),
                        tabBarIcon: ({ focused }) =>
                            <Image
                                source={require('../assets/images/settingsicon.png')}
                                style={[styles.tabImage, { tintColor: focused ? Colors.primary : '#ccc' }]}
                            />,

                    }}
                />
            </tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})

export default Main;