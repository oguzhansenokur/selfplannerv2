import React from 'react'
import {View,StyleSheet, Text} from 'react-native'

export default function Header() {
  return (
    <View style={styes.header}><Text>Self Planner</Text></View>
  )
}

const styes= StyleSheet.create({
    header:
    {
        justifyContent:'center',
        flex:3,
        backgroundColor:'red',
        height:'50%'
    }
})