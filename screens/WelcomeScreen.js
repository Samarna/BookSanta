import React,{Component} from 'react';
import {TouchableOpacity, TextInput, View, Text, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config.js';
import BookAnimation from '../components/books.js';

export default class WelcomeScreen extends Component {
    constructor(){
        super();
        this.state = {
            emailId : '',
            password : '',
            confirmPassword : '',
            isModalVisible : false,
            firstName : '',
            lastName : '',
            address : '',
            contact : '',
        }
    }
    userSignup=(emailId,password,confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert("Passwords don't match!");
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailId,password)
            .then(()=>{
                db.collection('users').add({
                    first_name : this.state.firstName,
                    last_name : this.state.lastName,
                    email_Id : this.state.emailId,
                    contact : this.state.contact,
                    address : this.state.address,
                })
                return Alert.alert("User successfully created!",' ',[{text:'OK', onPress:()=>{
                    this.setState({
                        isModalVisible : false
                    })
                }}]);
            }).catch((error)=>{
                var errorMessage = error.message;
                console.log(errorMessage);
                return Alert.alert(errorMessage);
            })
        }
    }
    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            //return Alert.alert("User successfully logged in!");
            console.log("User has logged in!")
            this.props.navigation.navigate('donateBooks');
        }).catch((error)=>{
            var errorMessage = error.message;
            console.log(errorMessage);
            return Alert.alert(errorMessage);
        })
    }
    showModal=()=>{
        return(
            <Modal 
            animationType ="fade"
            transparent = {true}
            visible = {this.state.isModalVisible}>
                <View style = {styles.modalContainer}>
                    <ScrollView style = {{width : '100%'}}>
                        <KeyboardAvoidingView style = {styles.keyboardAvoidingView}>
                            <Text style = {styles.modalTitle}>Registration Form</Text>
                            <TextInput style = {styles.formTextInput}
                            placeholder = "first name"
                            maxLength = {10}
                            onChangeText = {
                                text =>{this.setState({
                                    firstName : text,
                                })}
                            }></TextInput>
                            <TextInput style = {styles.formTextInput}
                            placeholder = "last name"
                            maxLength = {10}
                            onChangeText = {
                                text =>{this.setState({
                                    lastName : text,
                                })}
                            }></TextInput>
                            <TextInput style = {styles.formTextInput}
                            placeholder = "contact number"
                            maxLength = {10}
                            keyboardType = {'numeric'}
                            onChangeText = {
                                text =>{this.setState({
                                    contact : text,
                                })}
                            }></TextInput>
                            <TextInput style = {styles.formTextInput}
                            placeholder = "address"
                            multiline = {true}
                            onChangeText = {
                                text =>{this.setState({
                                    address : text,
                                })}
                            }></TextInput>
                            <TextInput style = {styles.formTextInput}
                            placeholder = "email"
                            keyboardType = {'email-address'}
                            onChangeText = {
                                text =>{this.setState({
                                    emailId : text,
                                })}
                            }></TextInput>
                            <TextInput style = {styles.formTextInput}
                            placeholder = "password"
                            secureTextEntry = {true}
                            onChangeText = {
                                text =>{this.setState({
                                    password : text,
                                })}
                            }></TextInput>
                            <TextInput style = {styles.formTextInput}
                            placeholder = "confirm password"
                            secureTextEntry = {true}
                            onChangeText = {
                                text =>{this.setState({
                                    confirmPassword : text,
                                })}
                            }></TextInput>
                            <View style = {styles.modalBackButton}>
                            <TouchableOpacity 
                            style = {styles.registerButton}
                            onPress = {()=>{
                                this.userSignup(this.state.emailId,this.state.password, this.state.confirmPassword)}
                            }>
                                <Text style = {styles.registerButtonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.modalBackButton}>
                            <TouchableOpacity
                            style = {styles.cancelButton}
                            onPress = {()=>this.setState({isModalVisible : false})}>
                                <Text style = {{color : '#ff5722'}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );

    }
    render(){
        return(<View style = {styles.container}><View style = {styles.profileContainer}> 
            <View>{this.showModal()}</View>
            <BookAnimation></BookAnimation>
            <Text style = {styles.title}>Book Santa</Text>
        </View>
        <View style = {styles.buttonContainer}>
            <TextInput style = {styles.loginBox} 
            placeholder = "abc@example.com"
            keyboardType = "email-address"
            onChangeText = {(text)=>{
                this.setState({
                    emailId : text,
                })
            }}></TextInput>
            <TextInput //style = {styles.loginBox}
            placeholder = "enter passcode"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
                this.setState({
                    password : text,
                })
            }}>Password</TextInput>
            <TouchableOpacity style = {[styles.button,{marginTop : 20, marginBottom : 20}]}
            onPress = {()=>{
                this.userLogin(this.state.emailId,this.state.password)
            }}>
                <Text style = {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button}
            onPress = {()=>{
                //this.userSignup(this.state.emailId,this.state.password)
                this.setState({
                    isModalVisible : true,
                })
            }}>
                <Text style = {styles.buttonText}>Sign-up</Text>
            </TouchableOpacity>
        </View>
        </View>);
    }
}
const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor:'#F8BE40',
    }, 
    modalContainer:{
        flex:1, 
        borderRadius:20, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#ffff", 
        marginRight:30, 
        marginLeft : 30, 
        marginTop:80, 
        marginBottom:80,
    },
    keyboardAvoidingView:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center' 
    },   
    modalTitle :{ 
        justifyContent:'center', 
        alignSelf:'center', 
        fontSize:30, 
        color:'#ff5722', 
        margin:50 
    },
    profileContainer:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center',
    },
    title : { 
        fontSize : 60, 
        fontWeight : "400", 
        paddingBottom:20, 
        color : '#df3d23', 
        marginTop: 20 
    }, 
    loginBox :{ 
        width : 300, 
        height : 20, 
        borderBottomWidth: 1.5, 
        borderColor : '#ff8a65', 
        fontSize: 20, 
        margin:10, 
        paddingLeft:10 , 
        alignItems : 'center' 
    }, 
    button : { 
        width:200, 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:25, 
        backgroundColor:"#ff9800", 
        shadowColor: "#000", 
        shadowOpacity: 0.30, 
        shadowRadius: 10.32, 
        elevation: 16, 
        shadowOffset: { width: 0, height: 8 }
    }, 
    buttonText:{ 
        color:'#ffff', 
        fontWeight:'200', 
        fontSize:20 
    }, 
    buttonContainer:{ 
        flex:1, 
        alignItems:'center' 
    },
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10 
    }, 
    registerButton:{ 
        width:200, 
        height:40, 
        alignItems:'center', 
        justifyContent:'center', 
        borderWidth:1, 
        borderRadius:10, 
        marginTop:30 
    }, 
    registerButtonText:{ 
        color:'#ff5722', 
        fontSize:15, 
        fontWeight:'bold' 
    }, 
    cancelButton:{ 
        width:200, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:5, 
    },
});