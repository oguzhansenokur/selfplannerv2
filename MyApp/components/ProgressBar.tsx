import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'



export default function ProgressBar() {
  
    const [progNum,setProgNum]=useState(75);
    const [progColor,setProgColor]=useState('black');
 
    const checkNums = () =>{
        if(progNum>0 && progNum<25)
        {
            setProgColor('#E98080')
        }
        else if(progNum>24 && progNum<75)
        {
            setProgColor('#F6FA55')
        }
        else if (progNum>74 && progNum<100)
        {
            setProgColor('#1DF667')
        }
        else if(progNum==100)
        {
            setProgColor('#158D3E')

        }
    }
 
    useEffect(()=>{
        checkNums()
    },[])

  
    return (

    <>
    <View style={styles.outBar} >
        <View style={[styles.progressBar  ,{backgroundColor:progColor,width:progNum.toString()+'%'}]} >

        </View>
    </View>
    <View style={styles.progressContent}>
        <Text style={{fontSize:16,color:'black',fontWeight:'bold'}}>0₺</Text>
        <Text style={{fontSize:16,color:'#E98080',fontWeight:'bold'}}>15000₺</Text>
        <Text style={{fontSize:16,color:'#158D3E',fontWeight:'bold'}}>29000₺</Text>

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