import React,{Component} from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView,TextInput,TouchableOpacity,Alert} from 'react-native';
import MyHeader from '../components/MyHeader.js';
import db from '../config';
import firebase from 'firebase';


export default class BookRequestScreen extends Component {
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            bookName : '',
            reasonToRequest : '',
            author : '',
        }
    }
    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    addRequest=(bookName,reasonToRequest,author)=>{
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        db.collection('Requested_Books').add({
            "User_Id" : userId,
            "Book_Name" : bookName,
            "Author_Name" : author,
            "Reason_To_Request" : reasonToRequest,
            "Request_Id" : randomRequestId,
        });
        this.setState({
            bookName : '',
            reasonToRequest : '',
            author : '',
        })
        return Alert.alert("Book Requested successfully!")
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title="Request Books"></MyHeader>
                <KeyboardAvoidingView style={styles.keyboardStyle}>
                    <TextInput style={styles.formTextInput} placeholder="Enter book name" 
                    onChangeText={(text)=>{
                        this.setState({
                            bookName : text,
                        })
                    }} value={this.state.bookName}></TextInput>
                    <TextInput style={styles.formTextInput} placeholder="Enter book author" 
                    onChangeText={(text)=>{
                        this.setState({
                            author : text,
                        })
                    }} value={this.state.author}></TextInput>
                    <TextInput style = {[styles.formTextInput, {height : 300}]} 
                    multiline numberOfLines = {10} 
                    placeholder = "Why do you need the book?"
                    onChangeText={(text)=>{
                        this.setState({
                            reasonToRequest : text,
                        })
                    }} value={this.state.reasonToRequest}></TextInput>
                    <TouchableOpacity style={styles.button}
                    onPress = {()=>{
                        this.addRequest(this.state.bookName,this.state.reasonToRequest,this.state.author)
                    }}>
                        <Text>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    keyBoardStyle : { 
        flex:1, 
        alignItems:'center', 
        justifyContent:'center' 
    }, 
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10, 
    }, 
    button:{ 
        width:"75%", 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:10, 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset:{ width: 0, height: 8}, 
        shadowOpacity: 0.44, 
        shadowRadius: 10.32, 
        elevation: 16, 
        marginTop:20 
    }, 
})