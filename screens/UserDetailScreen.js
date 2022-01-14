import React, { useEffect, useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
    const [state, setState] = useState({
        id: "",
        name: "",
        email: "",
        phone: ""
    })
    const getUserById = async(id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get()
        const user = doc.data()
        setState({
            ...user,
            id: doc.id
        })
    }
    
    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const handleDelete = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
        await dbRef.delete()
        alert("User delete")
        props.navigation.navigate('UsersList')
    }

    const handleUpdate = async() => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
        await dbRef.set({
            name: state.name,
            email: state.email,
            phone: state.phone
        })
        setState({
            id: "",
            name: "",
            email: "",
            phone: ""
        })
        alert("User update")
        props.navigation.navigate('UsersList')
    }
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    value={state.name}
                    placeholder="Name User"
                    onChangeText={(e) => handleChangeText("name", e)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    value={state.email}
                    placeholder="Email User"
                    onChangeText={(e) => handleChangeText("email", e)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    value={state.phone}
                    placeholder="Phone User"
                    onChangeText={(e) => handleChangeText("phone", e)} />
            </View>
            <View>
                <Button title="Update User" onPress={() => handleUpdate()} />
            </View>
            <View>
                <Button color="red" title="Delete User" onPress={() => handleDelete()} />
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

export default UserDetailScreen;