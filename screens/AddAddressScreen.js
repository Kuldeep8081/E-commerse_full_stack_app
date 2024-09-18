import { SafeAreaView, ScrollView, StyleSheet,Platform, Text, View,TextInput, Pressable } from 'react-native'
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Colors from '../Utills/Colors';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AddAddressScreen() {
    const navigation=useNavigation();
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, backgroundColor: 'white' }}>
    <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={{
          backgroundColor: Colors.PRIMARY_LIGHT,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          padding: 10, flexDirection: 'row', alignItems: 'center'
        }}>
          <Pressable style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 3,
            height: 44,
            flex: 1

          }}>
            <AntDesign style={{ paddingLeft: 10 }} name="search1" size={22} color="black" />
            <TextInput placeholder='Search MarriageFurniture.in' style={{ fontSize: 15, fontFamily: 'outfit-medium' }} />
          </Pressable>
          <Feather style={{ paddingRight: 10 }} name="mic" size={24} color="black" />
        </View>

        <View style={{padding:10}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Your Addresses</Text>
            <Pressable
            onPress={()=>navigation.navigate('Add')}
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:10,
                borderColor:"#d0d0d0",
                borderWidth:1,
                borderLeftWidth:0,
                borderRightWidth:0,
                paddingVertical:7,
                paddingHorizontal:5

            }}
            >
                <Text>Add a new address</Text>
                <EvilIcons name="chevron-right" size={24} color="black" />
            </Pressable>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})