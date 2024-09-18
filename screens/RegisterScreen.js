import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from './../Utills/Colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password
        };

        // Send a POST request to the backend API
        axios.post("http://192.168.207.46:8000/register", user)
        .then((response) => {
            console.log(response);
            Alert.alert("Registration Successful", "You have registered successfully");
            setName("");
            setEmail("");
            setPassword("");
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                Alert.alert("Registration Error", error.response.data.message);
            } else {
                Alert.alert("Registration Error", "An error occurred during registration");
            }
            console.log("Registration Failed", error);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    style={styles.logo}
                    source={require("./../assets/Images/Main_logo.png")}
                />
            </View>

            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Register to Your Account</Text>
                    </View>

                    {/* Input Box */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputBox}>
                            <Ionicons name="person" size={24} color="gray" />
                            <TextInput
                                value={name}
                                onChangeText={(text) => setName(text)}
                                style={styles.input}
                                placeholder='Enter Your Name'
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputBox}>
                            <MaterialIcons name="email" size={24} color='gray' />
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                style={styles.input}
                                placeholder='Enter Your Email'
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputBox}>
                            <AntDesign name="lock1" size={24} color="gray" />
                            <TextInput
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                style={styles.input}
                                placeholder='Enter Your Password'
                            />
                        </View>
                    </View>

                    <View style={styles.optionsContainer}>
                        <Text style={styles.keepLoggedInText}>Keep me logged in</Text>
                        <Text style={styles.forgotPasswordText}>Forget Password</Text>
                    </View>

                    {/* Register button */}
                    <Pressable onPress={handleRegister} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.goBack()} style={styles.signInLink}>
                        <Text style={styles.signInText}>Already have an account? Sign In</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 50,
        marginTop: 80,
        borderRadius: 15
    },
    headerContainer: {
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'outfit-medium',
        marginTop: 60,
        color: Colors.PRIMARY
    },
    inputContainer: {
        marginTop: 10
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: Colors.LIGHT_GRAY,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginTop: 30
    },
    input: {
        color: Colors.GRAY,
        marginVertical: 10,
        width: 300,
        fontSize: 16
    },
    optionsContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    keepLoggedInText: {
        fontFamily: 'outfit-bold',
        color: Colors.GRAY,
        fontSize: 18
    },
    forgotPasswordText: {
        color: Colors.BLUE,
        fontFamily: 'outfit-bold',
        fontSize: 18
    },
    registerButton: {
        marginTop: 50,
        width: 200,
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 15,
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    registerButtonText: {
        textAlign: 'center',
        fontFamily: 'outfit-regular',
        fontSize: 16,
        fontWeight: 'bold'
    },
    signInLink: {
        marginTop: 15
    },
    signInText: {
        marginTop:10,
        textAlign: 'center',
        fontSize: 18,
        color: Colors.GRAY
    }
});
