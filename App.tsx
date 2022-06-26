import React, { FC } from "react";
import {View } from "react-native";
import Navigation from './src/navigations'

const App:FC=()=>{
  return(
    <View style={{flex:1}} >
      <Navigation/>
    </View>
  )
}

export default App