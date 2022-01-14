import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import firebase from '../database/firebase'


const CreateUserScreen = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        phone: ""
    })
    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }
    const saveNewUser = async() => {
        if (!state.name) alert("Provide Name");
        else if (!state.email) alert("Provide Email");
        else if (!state.phone) alert("Provide Phone");
        else {
            await firebase.db.collection('users').add({
                name: state.name,
                email: state.email,
                phone: state.phone
            })
            alert("User saved")
            props.navigation.navigate('UsersList')
        }
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name User" onChangeText={(e) => handleChangeText("name", e)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User" onChangeText={(e) => handleChangeText("email", e)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User" onChangeText={(e) => handleChangeText("phone", e)} />
            </View>
            <View>
                <Button title="Save User" onPress={() => saveNewUser()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        margin: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default CreateUserScreen;