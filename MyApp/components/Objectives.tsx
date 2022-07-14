import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View, Alert, Modal, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet } from 'react-native-btr';
interface Props {
    id: number,
    objectName: String,
    objectAmount: number,
    objectCurr: number,
    objectNote: String,
}

const AddWallet = () => {


}






export default function Objectives(props: Props) {
    const [progNum, setProgNum] = useState(props.objectAmount);
    const [progColor, setProgColor] = useState('#000');
    const [modalVisible, setModalVisible] = useState(false);
    const [minusVisible, setMinusVisible] = useState(false);
    const [plusVisible, setPlusVisible] = useState(false);
    const [editName, setEditName] = useState(props.objectName);
    const [editAmount, setEditAmount] = useState(props.objectAmount);
    const [editCurr, setEditCurr] = useState(props.objectCurr);
    const [editNote, setEditNote] = useState(props.objectNote);
    const handleOnchangeEditName = (name) => { setEditName(name) };
    const handleOnchangeEditAmount = (amount) => { setEditAmount(amount) };
    const handleOnchangeEditCurr = (curr) => { setEditCurr(curr) };
    const handleOnchangeEditNote = (note) => { setEditNote(note) };
    



    const checkNums = () => {
        if (progNum >= 0 && progNum < 25) {
            setProgColor('#E98080')
        }
        else if (progNum > 24 && progNum < 75) {
            setProgColor('#F6FA55')
        }
        else if (progNum > 74 && progNum < 100) {
            setProgColor('#1DF667')
        }
        else if (progNum == 100) {
            setProgColor('#158D3E')

        }
    }
    const calculateProg = () => {
        if (props.objectAmount >= 0 && props.objectCurr >= 0 && props.objectAmount >= props.objectCurr) {
            setProgNum(Math.round((props.objectCurr / props.objectAmount) * 100))
            checkNums()
        }

    }


   

    useEffect(() => {
        calculateProg()
        checkNums()
    }, [editCurr, editAmount, editNote, editName,progColor,progNum,props])

    const toggleModalEdit = () => {
        setModalVisible(!modalVisible)
    }
    const toggleMinus = () => {
        setMinusVisible(!minusVisible)
    }
    const togglePlus = () => {
        setPlusVisible(!plusVisible)
    }

    const deleteItem = async () => {
        const result = await AsyncStorage.getItem('objective')
        let objectives = []
        let objectives2 = []
        if (result !== null) {
            objectives = JSON.parse(result)
            console.log(objectives)
        }
        objectives2 = objectives.filter(item => item.id != props.id)
        await AsyncStorage.setItem('objective', JSON.stringify(objectives2))


    }

    const DeleteItemAlert = () => {
        Alert.alert('Gerçekten Hedefinizi Silmek İstiyor musunuz?', 'Bu işlem geri alınamaz.', [{ text: 'Sil', onPress: deleteItem }, { text: 'İptal', style: 'cancel' }], { cancelable: true })

    }
    const EditItemFunction= async ()=>{
      const result = await AsyncStorage.getItem('objective')
        let res1 = []
        if(result !== null){
            res1 = JSON.parse(result)
        }
        let res2 = res1.filter(item=>
            item.id == props.id
        )
        res1=res1.filter(item=>item.id!=props.id)
        res2[0].objectName = editName
        res2[0].objectAmount = editAmount
        res2[0].objectCurr = editCurr
        res2[0].objectNote = editNote
        const merge=res1.concat(res2)

        await AsyncStorage.setItem('objective',JSON.stringify(merge))

    }

    


    return (
        <View style={styles.objectiveDiv} >
            <View style={styles.titleDiv} ><Text style={styles.titleText}>{props.objectName}</Text></View>
            <View style={styles.contentDiv} ><ProgressBar objectAmount={props.objectAmount} objectCurr={props.objectCurr} progColor={progColor} progNum={progNum} />

            </View>
            <View style={styles.buttonsDiv} ><TouchableOpacity onPress={togglePlus} style={styles.addButton}><Image style={{ alignSelf: 'center' }} source={require('./icons/plus.png')} /></TouchableOpacity><TouchableOpacity onPress={toggleMinus} style={styles.addButton}><Image style={{ alignSelf: 'center' }} source={require('./icons/minus.png')} /></TouchableOpacity><TouchableOpacity onPress={DeleteItemAlert} style={styles.deleteButon}><Image style={{ alignSelf: 'center' }} source={require('./icons/close.png')} /></TouchableOpacity><TouchableOpacity onPress={toggleModalEdit} style={styles.editButton}><Image style={{ alignSelf: 'center' }} source={require('./icons/edit.png')} /></TouchableOpacity></View>


            <BottomSheet visible={modalVisible}
                onBackButtonPress={toggleModalEdit}
                onBackdropPress={toggleModalEdit}>
                <View style={styles.bottomNavigationView} >
                    <View style={styles.headerInput} ><Text style={{ fontSize: 25, color: '#7B3B75', fontWeight: 'bold' }}>Hedef Düzenleme Ekranı</Text></View>
                    <View style={styles.formDiv} >
                        <View style={styles.itemDiv} >
                            <Text style={{ color: '#7B3B75', fontWeight: 'bold', fontSize: 16, marginLeft: '12%' }}>Hedef Adı</Text>
                            <TextInput value={editName} onChangeText={handleOnchangeEditName} style={{ backgroundColor: '#F5F5F5', width: '90%', height: 35, borderRadius: 50, paddingLeft: 15, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginTop: 5, marginBottom: 15 }} />
                            <Text style={{ color: '#7B3B75', fontWeight: 'bold', fontSize: 16, marginLeft: '12%' }}>Hedef Maaliyeti</Text>
                            <TextInput value={editAmount} onChangeText={handleOnchangeEditAmount} style={{ backgroundColor: '#F5F5F5', width: '90%', height: 35, borderRadius: 50, paddingLeft: 15, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginTop: 5, marginBottom: 15 }} />
                            <Text style={{ color: '#7B3B75', fontWeight: 'bold', fontSize: 16, marginLeft: '12%' }}>Mevcut Maaliyet</Text>
                            <TextInput value={editCurr} onChangeText={handleOnchangeEditCurr} style={{ backgroundColor: '#F5F5F5', width: '90%', height: 35, borderRadius: 50, paddingLeft: 15, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginTop: 5, marginBottom: 15 }} />
                            <Text style={{ color: '#7B3B75', fontWeight: 'bold', fontSize: 16, marginLeft: '12%' }}>Hedef Notu</Text>
                            <TextInput value={editNote} onChangeText={handleOnchangeEditNote} style={{ backgroundColor: '#F5F5F5', width: '90%', height: 35, borderRadius: 50, paddingLeft: 15, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginTop: 5, marginBottom: 15 }} />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '50%', height: '2%' }}>



                            <TouchableOpacity
                                onPress={EditItemFunction}
                                style={{ backgroundColor: '#7C3E66', width: '100%', height: '75%', margin: 85, justifyContent: 'center', alignItems: 'center', borderRadius: 50, }}
                                activeOpacity={1}


                            >
                                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Düzenle</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </BottomSheet>
            <BottomSheet visible={minusVisible}
                onBackButtonPress={toggleMinus}
                onBackdropPress={toggleMinus}>
                <View style={styles.bottomNavigationView} >
                    <View style={styles.headerInput} ><Text style={{ fontSize: 25, color: '#7B3B75', fontWeight: 'bold' }}>Para Çıkışı Ekranı</Text></View>
                    <View style={styles.formDiv} >
                        <View style={styles.itemDiv} >

                            <Text style={{ color: '#7B3B75', fontWeight: 'bold', fontSize: 16, marginLeft: '12%' }}>Eksilecek Para </Text>
                            <TextInput style={{ backgroundColor: '#F5F5F5', width: '90%', height: 35, borderRadius: 50, paddingLeft: 15, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginTop: 5, marginBottom: 15 }} />

                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '50%', height: '2%' }}>



                            <TouchableOpacity
                                style={{ backgroundColor: '#7C3E66', width: '100%', height: '75%', margin: 85, justifyContent: 'center', alignItems: 'center', borderRadius: 50, }}
                                activeOpacity={1}


                            >
                                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Devam Et</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </BottomSheet>
            <BottomSheet visible={plusVisible}
                onBackButtonPress={togglePlus}
                onBackdropPress={togglePlus}>
                <View style={styles.bottomNavigationView} >
                    <View style={styles.headerInput} ><Text style={{ fontSize: 25, color: '#7B3B75', fontWeight: 'bold' }}>Para Girişi Ekranı</Text></View>
                    <View style={styles.formDiv} >
                        <View style={styles.itemDiv} >

                            <Text style={{ color: '#7B3B75', fontWeight: 'bold', fontSize: 16, marginLeft: '12%' }}>Eklenecek Para </Text>
                            <TextInput style={{ backgroundColor: '#F5F5F5', width: '90%', height: 35, borderRadius: 50, paddingLeft: 15, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginTop: 5, marginBottom: 15 }} />

                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '50%', height: '2%' }}>



                            <TouchableOpacity
                                style={{ backgroundColor: '#7C3E66', width: '100%', height: '75%', margin: 85, justifyContent: 'center', alignItems: 'center', borderRadius: 50, }}
                                activeOpacity={1}


                            >
                                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Devam Et</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </BottomSheet>



        </View>
    )
}

const styles = StyleSheet.create({
    objectiveDiv:
    {
        backgroundColor: '#fff',
        margin: 20,
        height: 175,
        borderRadius: 25,
        shadowOpacity: 1,
        shadowColor: 'black'


    },
    titleDiv: {
        padding: 10,
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        fontSize: 17

    },
    buttonsDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,

        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    contentDiv: {
        margin: 20
    },
    addButton: {
        borderRadius: 100,
        backgroundColor: '#B46EAD',
        width: '20%',
        height: 30,
        justifyContent: 'center'


    },
    deleteButon: {
        borderRadius: 100,
        backgroundColor: '#B92525',
        width: '20%',
        height: 30,
        justifyContent: 'center'
    },
    editButton: {
        borderRadius: 100,
        backgroundColor: '#CCAB35',
        width: '20%',
        height: 30,
        justifyContent: 'center'
    }
    ,
    editModalDiv: {
        backgroundColor: 'gray',
        height: '100%',
        marginTop: '24%',
        opacity: 0.9,
        justifyContent: 'center',
        elevation: -1,
    },
    editModalDivInner: {
        backgroundColor: 'white',
        marginTop: '75%',
        width: '100%',
        height: '75%',
        alignSelf: 'center',
        elevation: 3,

    }, bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 500,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#B92525',
        width: '6%',
        height: '6%',
        borderRadius: 100,
        alignSelf: 'flex-end',
        margin: 10
    },
    editTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        color: '#7B3B75',
    },
    editForm: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',


    },
    textInput:
        { width: 300, height: '20%', borderColor: 'black', backgroundColor: '#F5F5F5', borderWidth: 1, marginBottom: 20, borderRadius: 50 },
    titleLabelDiv:
    {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '10%',
        marginBottom: '5%',
    },
    formDiv: {
        width: '100%',
        height: '800%',
        padding: 20
    },
    itemDiv: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
    }, headerInput: {
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center'


    }
})