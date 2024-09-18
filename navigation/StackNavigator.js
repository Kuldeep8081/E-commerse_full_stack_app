//rnfes
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ProductIntoScreen from '../screens/ProductIntoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#E90074' : '#8e8e93' }}>
              {route.name}
            </Text>
          ),
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => focused
              ? (<Entypo name="home" size={24} color="#E90074" />)
              : (<AntDesign name="home" size={24} color="black" />)
          }}
        />

        <Tab.Screen
          name='Profile'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => focused
              ? (<Ionicons name="person" size={24} color="#E90074" />)
              : (<Ionicons name="person-outline" size={24} color="black" />)
          }}
        />

        <Tab.Screen
          name='Cart'
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => focused
              ? (<AntDesign name="shoppingcart" size={24} color="#E90074" />)
              : (<AntDesign name="shoppingcart" size={24} color="black" />)
          }}
        />
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={ProductIntoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Address" component={AddAddressScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Add" component={AddressScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})