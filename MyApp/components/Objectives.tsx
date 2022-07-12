import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View,Alert,Modal } from 'react-native'
import React, { useState ,useEffect} from 'react'
import ProgressBar from './ProgressBar'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    id: number,
    objectName: String,
    objectAmount:number,
    objectCurr : number,
    objectNote : String,
}

const AddWallet=()=> {


}






export default function Objectives(props:Props) {
    const [progNum,setProgNum]=useState(props.objectAmount);
    const [progColor,setProgColor]=useState('#000');
    const [modalVisible,setModalVisible]=useState(false);

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
        if(props.objectAmount>0 && props.objectCurr>0 && props.objectAmount>=props.objectCurr)
        {
            setProgNum(Math.round((props.objectCurr/props.objectAmount)*100))
            checkNums()
        }
      
    }

   

 
    useEffect(()=>{
        calculateProg()
        checkNums()
    },[])

    const toggleModalEdit=()=>{
        setModalVisible(!modalVisible)
    }

   
    const deleteItem= async ()=>{
       const result= await AsyncStorage.getItem('objective')
       let objectives=[]
       let objectives2=[]
       if(result!==null)
       {objectives=JSON.parse(result)
        console.log(objectives)
    } 
        objectives2=objectives.filter(item=>item.id!=props.id)
        await AsyncStorage.setItem('objective',JSON.stringify(objectives2))
    

    }

    const DeleteItemAlert=()=>{
        Alert.alert('Gerçekten Hedefinizi Silmek İstiyor musunuz?','Bu işlem geri alınamaz.',[{text:'Sil',onPress:deleteItem},{text:'İptal',style:'cancel'}],{cancelable:true})
    
    }
  

  return (
    <View style={styles.objectiveDiv} >
        <View style={styles.titleDiv} ><Text style={styles.titleText}>{props.objectName}</Text></View>
        <View style={styles.contentDiv} ><ProgressBar objectAmount={props.objectAmount} objectCurr={props.objectCurr} progColor={progColor} progNum={progNum} />
        
        </View>
      <View style={styles.buttonsDiv} ><TouchableOpacity style={styles.addButton}><Image style={{alignSelf:'center'}} source={require('./icons/plus.png')} /></TouchableOpacity><TouchableOpacity style={styles.addButton}><Image style={{alignSelf:'center'}} source={require('./icons/minus.png')} /></TouchableOpacity><TouchableOpacity onPress={DeleteItemAlert} style={styles.deleteButon}><Image style={{alignSelf:'center'}} source={require('./icons/close.png')} /></TouchableOpacity><TouchableOpacity  onPress={toggleModalEdit} style={styles.editButton}><Image style={{alignSelf:'center'}} source={require('./icons/edit.png')} /></TouchableOpacity></View>
      <Modal animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModalEdit}
        >
            <View style={styles.editModalDiv} >
                
                <View style={styles.editModalDivInner} >
                <TouchableOpacity style={styles.closeButton}  onPress={toggleModalEdit}>
                    <Image source={require('./icons/close.png')} />
               </TouchableOpacity>

                </View>
            </View>
        
        </Modal>
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
    ,
    editModalDiv:{
        backgroundColor:'gray',
        height:'100%',
        marginTop:'24%',
        opacity:0.9,
        justifyContent:'center',
        zIndex:-1,
    },
    editModalDivInner:{
        backgroundColor:'white',
        margin:20,
        width:'100%',
        height:'60%',
        alignSelf:'center',
        zIndex:1,

    },
    closeButton:{
        backgroundColor:'#B92525',
        width:'6%',
        height:'6%',
        borderRadius:100,
        alignSelf:'flex-end',
        margin:10
    }
})