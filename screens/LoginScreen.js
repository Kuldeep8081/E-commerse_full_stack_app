//rnfs
import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from './../Utills/Colors'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation();

    useEffect(()=>{
        const checkLoginStatus=async()=>{
            try{
                const token=await AsyncStorage.getItem('authToken');

                if(token){
                    navigation.replace("Main");
                }
            }catch(error){
                console.log("error message",error);
            }
        };
        checkLoginStatus();
    },[]);

    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        };
    
        axios.post("http://192.168.207.46:8000/login", user)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
    
                if (token) {
                    AsyncStorage.setItem("authToken", token)
                        .then(() => {
                            navigation.replace("Main");
                        })
                        .catch((storageError) => {
                            Alert.alert("Storage Error", "Failed to save token.");
                            console.log(storageError);
                        });
                } else {
                    Alert.alert("Login Error", "No token received.");
                }
            })
            .catch((error) => {
                // Log the full error object to debug
                console.log("Login Error Details:", error);
    
                const errorMessage = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : "An unexpected error occurred. Please try again.";
    
                Alert.alert("Login Error", errorMessage);
            });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <View>
                <Image
                    style={{ width: 250, height: 50, marginTop: 80, borderRadius: 15 }}
                    source={require("./../assets/Images/Main_logo.png")}
                />
            </View>

            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text
                            style={{ fontSize: 20, fontFamily: 'outfit-medium', marginTop: 60, color: Colors.PRIMARY }}
                        >Login In to Your Account
                        </Text>


                        {/* INput Box */}

                        <View style={{ marginTop: 70 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                    backgroundColor: Colors.LIGHT_GRAY,
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                    borderRadius: 5,
                                    marginTop: 30
                                }}
                            >
                                <MaterialIcons name="email" size={24} color='gray' />
                                <TextInput
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    style={{ color: Colors.GRAY, marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }}
                                    placeholder='Enter Your Email' />
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                    backgroundColor: Colors.LIGHT_GRAY,
                                    paddingVertical: 5,
                                    paddingHorizontal: 5,
                                    borderRadius: 5,
                                    marginTop: 30
                                }}
                            >
                                <AntDesign name="lock1" size={24} color="gray" />
                                <TextInput
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    secureTextEntry={true}
                                    style={{ color: Colors.GRAY, marginVertical: 10, width: 300, fontSize: password ? 16 : 16 }}
                                    placeholder='Enter Your Password' />
                            </View>
                        </View>
                    </View>


                    <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'outfit-bold', color: Colors.GRAY, fontSize: 18 }}>
                            Keep me logged in
                        </Text>


                        <Text style={{ color: Colors.BLUE, fontFamily: 'outfit-bold', fontSize: 18 }}>
                            Forget Password
                        </Text>
                    </View>

                    {/* login button */}

                    <Pressable onPress={handleLogin}
                        style={{
                            marginTop: 50,
                            width: 200,
                            backgroundColor: Colors.PRIMARY_LIGHT,
                            padding: 15,
                            borderRadius: 6,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'outfit-regular',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                            Login
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Register')} style={{ marginTop: 15 }}>
                        <Text style={{
                            marginTop: 10,
                            textAlign: 'center',
                            fontSize: 18,
                            color: Colors.GRAY
                        }}>
                            Don't have an account? Sign Up
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})