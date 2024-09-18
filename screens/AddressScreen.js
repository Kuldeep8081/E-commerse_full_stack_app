import { SafeAreaView, ScrollView, StyleSheet, Platform, Text, View, TextInput, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../Utills/Colors'
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';


export default function AddressScreen() {
const [name, setName] = useState("");
const [mobileNo, setMobileNo] = useState("");
const [houseNo, setHouseNo] = useState("");
const [street, setStreet] = useState("");
const [landmark, setLandmark] = useState("");
const [postalCode, setPostalCode] = useState("");
const {userId,setUserId}=useContext(UserType)

useEffect(() => {
  const fetchUser = async () => {
      try {
          const token = await AsyncStorage.getItem("authToken"); // Ensure this key is correct
          if (token) {
              const decodedToken = jwtDecode(token);
              const userId = decodedToken.userId;
              setUserId(userId);
              console.log("userId is ", userId);
          } else {
              console.error("No token found");
          }
      } catch (error) {
          console.error("Error decoding token:", error);
      }
  };
  fetchUser();
}, []);


  function handleAddAddress() {
  }
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, backgroundColor: 'dark' }}>
      <ScrollView >
        <View style={{ height: 50, backgroundColor: Colors.PRIMARY_LIGHT }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Add a new Address</Text>
          <TextInput placeholderTextColor={'black'} placeholder='India' style={{ padding: 10, borderColor: "#d0d0d0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Full Name (first and Last name)</Text>
            <TextInput value={name} onChangeText={(text)=>setName(text)} placeholderTextColor={'black'} placeholder='Enter your Name' style={{ padding: 10, borderColor: "#d0d0d0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
          </View>


          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mobile number</Text>
            <TextInput value={mobileNo} onChangeText={(text)=>setMobileNo(text)}  inputMode='decimal' placeholderTextColor={'black'} placeholder='Enter your Mobile number' style={{ padding: 10, borderColor: "#d0d0d0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Flat,House No.,Building,Company</Text>
            <TextInput value={houseNo} onChangeText={(text)=>setHouseNo(text)}  placeholderTextColor={'black'} placeholder='any...' style={{ padding: 10, borderColor: "#d0d0d0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Area,Street,sector,village</Text>
            <TextInput value={street} onChangeText={(text)=>setStreet(text)}   placeholderTextColor={'black'} placeholder='any...' style={{ padding: 10, borderColor: "#d0d0d0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>LandMark</Text>
            <TextInput value={landmark} onChangeText={(text)=>setLandmark(text)}  placeholderTextColor={'black'} placeholder='Eg.near AIIMS Rea bareali.' style={{ padding: 10, borderColor: "#d0d0d0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>pincode</Text>
            <TextInput value={postalCode} onChangeText={(text)=>setPostalCode(text)}  keyboardType='numeric' placeholderTextColor={'black'} placeholder='Enter your pincode' style={{ padding: 10, borderColor: "#d0d0d0", borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
          </View>
          
          <Pressable
          onPress={handleAddAddress}
          style={{backgroundColor:Colors.PRIMARY_LIGHT,padding:19,borderRadius:6,justifyContent:'center',alignItems:'center',marginTop:'20'}}>
            <Text style={{fontWeight:'bold'}}>Add Address</Text>
          </Pressable>

        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})