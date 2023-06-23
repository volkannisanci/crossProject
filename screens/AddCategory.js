import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';
import { ActivityIndicator, Button, Headline, TextInput } from 'react-native-paper';


const Home = (props) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [isFetching, setIsFetching] = useState(false);



    const editCategory = async () => {
        if (categoryName && categoryDescription) {
            setIsFetching(true);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "name": categoryName,
                "description": categoryDescription
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://northwind.vercel.app/api/categories", requestOptions)
                .then(response => response.text())
                .then(result => {
                    alert('Added Succesfully')
                })
                .catch(error => console.log('error', error));
            setIsFetching(false);
        }
        else {
            alert("Please enter values")
        }

    }


    return (
        <View style={styles.sectionContainer} >
            {isFetching ? <ActivityIndicator /> : <>
                <Headline>
                    Add Category
                </Headline>
                <TextInput onChangeText={(text) => {
                    setCategoryName(text)
                }} value={categoryName} />
                <TextInput multiline={true} onChangeText={(text) => {
                    setCategoryDescription(text)
                }} value={categoryDescription} />
                <Button mode="contained" onPress={() => editCategory()}>
                    Save
                </Button>
            </>}



        </View>
    );

}

const styles = StyleSheet.create({
    sectionContainer: {
        shadowOffset: { width: 5, height: 0 },
        width: '90%',
        borderRadius: 12,
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: "beige",
        padding: 10,
        marginVertical: 20,
        flex: 1,
        justifyContent: "space-between"

    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },
    categ: {
        padding: 10,
        margin: 10,
        marginVertical: 20,
        backgroundColor: "purple",
        borderRadius: 10,
        color: "white",
        fontWeight: 'bold',
        alignContent: 'center'
    },
    innerGrid: {
        width: '50%',
        textAlign: 'flex-start',
        flexDirection: 'row',
        fontSize: 18,
        marginVertical: 20,
    },
    register: {
        alignItems: "center",
        marginHorizontal: 20,
        paddingVertical: 10
    },
    container: {
        padding: 10,
        paddingHorizontal: 20
    },
    sumBtn: {
        alignItems: "center",
        padding: 10,
        backgroundColor: "green",
        margin: 20,
        borderRadius: 10
    },
    sumText: {
        fontSize: 30,
        marginVertical: 20
    },
    sumBtnTxt: {
        fontWeight: 'bold',
        color: "white",
        fontSize: 20
    },
    sumCon: {
        justifyContent: "center",
        alignItems: 'center'
    },
    myInput: {
        backgroundColor: 'lightblue',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Home
