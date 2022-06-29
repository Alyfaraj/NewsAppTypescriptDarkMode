import React, { FC } from "react";
import {LogBox, View } from "react-native";
import Navigation from './src/navigations'
LogBox.ignoreAllLogs();

const App:FC=()=>{
  return(
    <View style={{flex:1}} >
      <Navigation/>
    </View>
  )
}

export default App