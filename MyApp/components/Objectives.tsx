import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState ,useEffect} from 'react'
import ProgressBar from './ProgressBar'

interface Props {
    key: number,
    objectName: String,
    objectAmount:number,
    objectCurr : number,
    objectNote : String,
}

export default function Objectives(props:Props) {
    const [progNum,setProgNum]=useState(props.objectAmount);
    const [progColor,setProgColor]=useState('#000');

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
    const calculateProg=()=>{
        if(props.objectAmount>0 && props.objectCurr>0)
        {
            setProgNum(Math.round((props.objectCurr/props.objectAmount)*100))
            checkNums()
        }
      
    }

 
    useEffect(()=>{
        calculateProg()
        checkNums()
    },[])


  

  return (
    <View style={styles.objectiveDiv} >
        <Text ></Text>
        <View style={styles.titleDiv} ><Text style={styles.titleText}>{props.objectName}</Text></View>
        <View style={styles.contentDiv} ><ProgressBar objectAmount={props.objectAmount} objectCurr={props.objectCurr} progColor={progColor} progNum={progNum} />
        
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
        backgroundColor:'#ebf5f0',
        justifyContent:'space-between',
        padding:10,

        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
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