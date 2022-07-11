import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'

interface Props {
    objectAmount:number,
    objectCurr : number,
    progColor:string,
    progNum:number,

}

export default function ProgressBar(props:Props) {
    
  
   
  
    return (

    <>
    <View style={styles.outBar} >
        <View style={[styles.progressBar  ,{backgroundColor:props.progColor,width:props.progNum.toString()+'%'}]} >

        </View>
    </View>
    <View style={styles.progressContent}>
        <Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>0₺</Text>
        <Text style={{fontSize:16,color:'#E98080',fontWeight:'bold'}}>{props.objectCurr}₺</Text>
        <Text style={{fontSize:16,color:'#158D3E',fontWeight:'bold'}}>{props.objectAmount}₺</Text>

    </View>
    </>
  )
}

const styles = StyleSheet.create({
    outBar:{
        backgroundColor:'#DADADA',
        width:'90%',
        height:10,
        alignSelf:'center',
        padding:3,
        borderRadius:50,

    },
    progressBar:{
        
        height:5,
        borderRadius:50
    },
    progressContent:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        
    }
})