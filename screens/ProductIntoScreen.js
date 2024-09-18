import { ScrollView, StyleSheet, Text, View,Pressable,TextInput,Platform, ImageBackground, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import Colors from '../Utills/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

export default function ProductIntoScreen() {
    const route=useRoute();
    const {width}=Dimensions.get("window");
    const height=(width*100)/100;
    const navigation=useNavigation();
    const dispatch=useDispatch();
    const [addedToCart,setAddedToCart]=useState(false);
    const addItemToCart=(item)=>{
        setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(()=>{
            setAddedToCart(false);
        },60000)
    }
    const cart=useSelector((state)=>state.cart.cart);

    console.log(cart);

  return (
    <View style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, backgroundColor: 'white',}}>
    <ScrollView style={{height:"92%" }}
    showsHorizontalScrollIndicator={false}>
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {route?.params?.carouselImages?.map((item,index)=>(
                <ImageBackground style={{height,width,marginTop:25,resizeMode: 'contain'}} source={item} key={index}>
                    <View style={{padding:20,flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#c60c30",justifyContent:'center',alignItems:'center',}}>
                            <Text style={{textAlign:'center',color:'white',fontWeight:600,fontSize:12}}>20% off</Text>
                        </View>
                        
                        <View>
                        <View style={{width:40,height:40,borderRadius:20,backgroundColor:Colors.GRAY,justifyContent:'center',alignItems:'center',}}>
                           <MaterialCommunityIcons name="share-variant" size={24} color="black" />
                        </View>
                        <View style={{marginTop:10,width:40,height:40,borderRadius:20,backgroundColor:Colors.GRAY,justifyContent:'center',alignItems:'center',}}>
                        <AntDesign name="hearto" size={24} color="black" />
                        </View>
                        </View>

                    </View>
                </ImageBackground>
            ))}
        </ScrollView>

        <View style={{padding:10}}>
            <Text style={{fontSize:15,fontWeight:500,}}>
            {route?.params?.title}
            </Text>
            <Text style={{fontSize:18,fontWeight:'600',marginTop:6}}>₹{route?.params?.price}</Text>
        </View>

        <Text style={{height:1,borderColor:'#d0d0d0',borderWidth:1}}/>

        <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
            <Text>Color:</Text>
            <Text style={{fontSize:15,fontWeight:'bold'}}> {route?.params?.color}</Text>
        </View>

        <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
            <Text>Size:</Text>
            <Text style={{fontSize:15,fontWeight:'bold'}}> {route?.params?.size}</Text>
        </View>

        <Text style={{height:1,borderColor:'#d0d0d0',borderWidth:1}}/>

        <View style={{padding:10}}>
            <Text style={{fontSize:15,fontWeight:'bold',marginVertical:5}}>Total: ₹{route?.params?.price}</Text>
            <Text style={{color:'#00ced1'}}>{route?.params?.freeDelivery}</Text>
            <Text style={{color:'green',marginHorizontal:5,fontWeight:500,fontSize:20,marginVertical:5}}>In Stock</Text>
            <View style={{flexDirection:'row',marginVertical:5,alignItems:'center'}}>
            <Ionicons name="location-outline" size={24} color="black" />
            <Text style={{fontSize:15,fontWeight:500}}>Deliver to Kuldeep - PratapGarh 230141</Text>
            </View>
        </View>
        
    </ScrollView>
        <View style={{flexDirection:'row',height:'8%',justifyContent:'space-around'}}>
            <Pressable onPress={()=>addItemToCart(route?.params?.item)} style={{backgroundColor:"#ffc72c",paddingHorizontal:30,fontSize:15,fontWeight:'bold',borderRadius:20,justifyContent:'center',alignItems:'center',marginHorizontal:10,marginVertical:10}}>
                {addedToCart
                ?
                (<Text>Added to Cart</Text>)
                :(<Text>Add to Cart</Text>)
                }
            </Pressable>

            <Pressable style={{backgroundColor:"#ffac1c",paddingHorizontal:30,fontSize:15,fontWeight:'bold',borderRadius:20,justifyContent:'center',alignItems:'center',marginHorizontal:10,marginVertical:10}}>
                <Text>Buy Now</Text>
            </Pressable>
        </View>
        </View>
  )
}

const styles = StyleSheet.create({})