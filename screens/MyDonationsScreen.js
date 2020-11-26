import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class MyDonationsScreen extends Component{
    constructor(){
        super();
        this.state={
            donorId : firebase.auth().currentUser.email,
            donorName : '',
            allDonations : [],
        }
    }
    getAllDonations=()=>{
        this.requestRef = db.collection("all_donations").where("Donor_Id","==",this.state.donorId)
        .onSnapshot((snapshot)=>{
            var allDonations = snapshot.docs.map((document)=>{
                document.data();
                //donation["Doc_Id"] = document.id;
                this.setState({
                    allDonatons : allDonations,
                })
            })
        })
    }
    keyExtractor = (item,index)=>index.toString();

    renderItem = ({item,i})=>(
        <ListItem key={i}
        title = {item.Book_Name}
        subtitle = {"Requested by : "+item.Requested_By +"\nStatus : " + item.Request_Status}
        leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>} 
        titleStyle={{ color: 'black', fontWeight: 'bold' }} 
        rightElement={ <TouchableOpacity style={styles.button}> 
        <Text style={{color:'#ffff'}}>Send Book</Text> 
        </TouchableOpacity> 
        } bottomDivider></ListItem>
    )
    componentDidMount(){
        this.getAllDonations();
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader navigator = {this.props.navigation}
                title = "My Donations"></MyHeader>
                <View style = {{flex:1}}>{this.state.allDonations.length===0?(
                <View style = {styles.subtitle}>
                    <Text style = {{fontSize:20}}>No Donations Available</Text>
                </View>
                ):(<FlatList keyExtractor= {this.keyExtractor}
                data = {this.state.allDonations}
                renderItem = {this.renderItem}></FlatList>)}</View>
                <Text>My Donations</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({ 
    button:{ 
        width:100, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 8 }, 
        elevation : 16 
    }, 
    subtitle :{ 
        flex:1, 
        fontSize: 20, 
        justifyContent:'center', 
        alignItems:'center' 
    } 
})