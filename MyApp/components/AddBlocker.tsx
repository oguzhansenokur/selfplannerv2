import {View,StyleSheet,Button,TouchableOpacity,Image,Text} from 'react-native'
import React from 'react'

interface addBlockerProps{
funct:any;
}


export default function AddBlocker(props:addBlockerProps) {
  return (
    <View >
<TouchableOpacity style={styles.button} activeOpacity={1} onPress={props.funct} >
  <Image source={require('./Group_12.png')} />
    


</TouchableOpacity>   
 </View>
  )
}

const styles=StyleSheet.create({
  button:{
    
    width:500,
    height:100,
    alignItems:'center',
    backgroundColor:'white',
    justifyContent:'center'

  }
})

