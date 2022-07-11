import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'

export default function Objectives(props) {
  
  

    console.log(props.name)
  return (
    <View style={styles.objectiveDiv} >
        <Text >{props.id}</Text>
        <View style={styles.titleDiv} ><Text style={styles.titleText}>{props.name}</Text></View>
        <View style={styles.contentDiv} ><ProgressBar/>
        
        </View>
      <View style={styles.buttonsDiv} ><TouchableOpacity style={styles.addButton}><Image style={{alignSelf:'center'}} source={require('./icons/plus.png')} /></TouchableOpacity><TouchableOpacity style={styles.addButton}><Image style={{alignSelf:'center'}} source={require('./icons/minus.png')} /></TouchableOpacity><TouchableOpacity style={styles.deleteButon}><Image style={{alignSelf:'center'}} source={require('./icons/close.png')} /></TouchableOpacity><TouchableOpacity style={styles.editButton}><Image style={{alignSelf:'center'}} source={require('./icons/edit.png')} /></TouchableOpacity></View>

    </View>
  )
}

const styles = StyleSheet.create({
    objectiveDiv:
    {
        backgroundColor:'#fff',
        margin:20,
        height:175,
        borderRadius:25,
        shadowOpacity:1,
        shadowColor:'black'

        
    },
    titleDiv:{
        padding:10,
        justifyContent:'center',
    },
    titleText:{
        fontWeight:'bold',
        textAlign:'center',
        color:'black',
        fontSize:17

    },
    buttonsDiv:{
        flexDirection:'row',
        
        justifyContent:'space-between',
        padding:10

    },
    contentDiv:{
        margin:20
    },
    addButton:{
        borderRadius:100,
        backgroundColor:'#B46EAD',
        width:'20%',
        height:30,
        justifyContent:'center'
        
        
    },
    deleteButon:{
        borderRadius:100,
        backgroundColor:'#B92525',
        width:'20%',
        height:30,
        justifyContent:'center'
    },
    editButton:{
        borderRadius:100,
        backgroundColor:'#CCAB35',
        width:'20%',
        height:30,
        justifyContent:'center'
    }
})