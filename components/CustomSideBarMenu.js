import React, { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class CustomSideBarMenu extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}></DrawerItems>
                </View>
                <View style = {styles.logOutContainer}>
                    <TouchableOpacity style = {styles.logOutButton} 
                    onPress = {
                        ()=>{
                            this.props.navigation.navigate('welcomeScreen');
                            firebase.auth().signOut();
                        }
                    }>
                        <Text style = {styles.logOutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({ 
    container : { 
        flex : 1 
    }, 
    drawerItemsContainer:{ 
        flex : 0.5 
    }, 
    logOutContainer : { 
        flex:0.2, 
        justifyContent:'flex-end', 
        paddingBottom:20 
    }, 
    logOutButton : { 
        height:30, 
        width:'100%', 
        justifyContent:'center', 
        padding:5, 
    }, 
    logOutText:{ 
        fontSize: 20, 
        fontWeight:'bold' 
    } 
})