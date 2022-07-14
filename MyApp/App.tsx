import { SafeAreaProvider } from 'react-native-safe-area-context';
import {View,Text,StyleSheet,SafeAreaView,TextInput, Touchable, TouchableOpacity, FlatList, Alert, ScrollView} from "react-native"
import  React,{Key, useEffect, useState} from 'react'
import AddBlocker from './components/AddBlocker';
import { BottomSheet } from 'react-native-btr';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import Objectives from './components/Objectives';

type PropType = {
  id: number,
  objectName: String,
  objectAmount:number,
  objectCurr : number,
  objectNote : String

}

export default function App() {
  const [objName,setObjName]= useState('')
  const [objAmount,setObjAmount]= useState(0)
  const [objCurr,setObjCurr]= useState(0)
  const [objNote,setObjNote]= useState('')
  const [time,setTime] = useState(0)
  const [visible, setVisible] = useState(false);
  const handleOnChangeName = (name) => {setObjName(name)};
  const handleOnChangeAmount = (amount) => {setObjAmount(amount)};
  const handleOnChangeCurr = (curr ) => {setObjCurr(curr)};
  const handleOnChangeNote = (note ) => {setObjNote(note)};
  const [objectives,setObjectives] = useState<Array<any>>([])

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  
  


  const handleSubmit = async ()=>{
   
    

      const newObj={id:Date.now(),objectName:objName,objectAmount:objAmount,objectCurr:objCurr,objectNote:objNote}
      const newObjectives = [...objectives,newObj]
      setObjectives(newObjectives)
      await AsyncStorage.setItem('objective',JSON.stringify(newObjectives))
    


  }

  const ListofObjects=()=>{
  
    
  
  }
    
    
  
  const deleteAll=()=>
  {
   AsyncStorage.clear()
   Alert.alert('Silme İşlemi Başarılı!')
  }

  const getObjectives= async () =>{
    
    const result= await AsyncStorage.getItem('objective')
    if(result !== null){
      setObjectives(JSON.parse(result))
     // console.log(JSON.parse(result))
    }
  
  }
  useEffect(()=> {

    getObjectives();
  },[objectives])

    return (
      <SafeAreaProvider style={styles.container}>

        <View style={styles.navbar} ><Text style={{color:'white',fontSize:25}}>SELF PLANNER</Text></View>
        <View style={styles.content}>
          <ScrollView>
       <View style={styles.row} ><AddBlocker funct={toggleBottomNavigationView} /></View> 

       <TouchableOpacity onPress={deleteAll} style={{backgroundColor:'red', height:50,width:70,alignSelf:'center' ,marginTop:10, borderRadius:10, padding:10 }}>
      <Text style={{color:'white'}}>Delete</Text>
       </TouchableOpacity>
       <View style={{justifyContent:'center'}}>
        
        {objectives.map((item)=>{
          if(Object.keys(item).length>0){
            return(
              <Objectives key={item.id} id={item.id} objectName={item.objectName} objectAmount={item.objectAmount} objectCurr={item.objectCurr} objectNote={item.objectNote}/>
            )
          
          }
          else{
          
          }
        
        })}
      
       
     
       </View>
       <BottomSheet 
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}


        >
         <View         style={styles.bottomNavigationView}>
         <View style={styles.headerInput} >
          <Text style={{fontSize:25,color:'#7B3B75',fontWeight:'bold'}} >Manuel Seçim</Text>
          </View>
          <View style={styles.contentInput} >
          <Text style={styles.label} >Hedef Adı</Text>
          <TextInput 
          value={objName}
          onChangeText={handleOnChangeName}
          style={styles.textInput}
          />
          <Text style={styles.label} >Hedefin Maaliyeti (₺)</Text>

          <TextInput 
            keyboardType='numeric'
            value={objAmount}
            onChangeText={handleOnChangeAmount}
          style={styles.textInput}
          />
          <Text style={styles.label} >Başlangıç Sermayeniz (₺)</Text>


          <TextInput 
          keyboardType='numeric'
          value={objCurr}
          onChangeText={handleOnChangeCurr}
          style={styles.textInput}
          />

           <Text style={styles.label} >Başlangıç Notunuz</Text>
          <TextInput
          value={objNote}
          onChangeText={handleOnChangeNote}

          style={styles.textInput}
          />
          <View style={{flexDirection:'column',justifyContent:'center',width:'50%',height:'2%'}}>
            
         
            
            <TouchableOpacity 
            onPress={handleSubmit}
            style={{backgroundColor:'#7C3E66',width:'100%',height:'75%',margin:85,justifyContent:'center',alignItems:'center',borderRadius:50, }}
            activeOpacity={1}


            >
              <Text style={{fontSize:25,color:'white',fontWeight:'bold'}}>Ekle</Text>
            </TouchableOpacity>
            </View>

          </View>

          </View> 
          </BottomSheet>
     

        </ScrollView>
        </View>

      </SafeAreaProvider>
    );
  
}

const styles= StyleSheet.create(
  {
    container:{
      flex:1,
  

    },
    navbar:{
      flex:1,
      backgroundColor:'#7C3E66',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      


    },
    content:{
      flex:7,
      
      backgroundColor:'#F2EBE9',
      flexDirection:'column'
    },
    row:{
      flexDirection:'row',
      justifyContent:'center',
      width:'100%',
    
    },
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: 500,
      alignItems: 'center',
    },
    contentInput:{
      width:'100%',
      height:'800%',
      padding:20
     

    },
    headerInput:{
      width:'100%',
      height:'10%',
      alignItems:'center',
      justifyContent:'center'


    },
   textInput:
    {backgroundColor:'#F5F5F5',width:'100%',height:'1%',borderRadius:50,paddingLeft:15,color:'black',fontWeight:'bold'},
    label:{marginBottom:10,marginTop:5,fontSize:17,marginLeft:10, color:'#7B3B75',fontWeight:'bold',},
    buttonTextInput:{
      backgroundColor:'',
    }
  }
)

