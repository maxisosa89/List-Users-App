import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from 'react-native';
import firebase from "../database/firebase";
import { ListItem } from 'react-native-elements'

const UsersList = (props) => {
    const [state, setState] = useState([])
    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
            const users = []
            querySnapshot.docs.forEach(doc => {
                const { name, email, phone } = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            })
            setState(users)
        })
    }, [])

    return (
        <ScrollView>
            <Button title="create" onPress={() => props.navigation.navigate('CreateUserScreen')} />
            {
                state.map(user => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => {
                            props.navigation.navigate('UserDetailScreen', {
                                userId: user.id
                            })
                        }} >
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default UsersList;