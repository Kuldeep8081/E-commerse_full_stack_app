import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

export default function ProductItems({item}) {
  const navigation=useNavigation();
  const [addedToCart,setAddedToCart]=useState(false);
  const dispatch=useDispatch();
  const addItemToCart=(item)=>{
    setAddedToCart(true);
        dispatch(addToCart(item));
        setTimeout(()=>{
            setAddedToCart(false);
        },60000)
  }
  return (
    <Pressable 
     style={{marginHorizontal:10,marginVertical:25}}>
        <Image style={{width:150,height:150,resizeMode:'contain'}} source={{uri:item?.image}} />
        <Text numberOfLines={1} style={{width:150,marginTop:10,textAlign:'center'}}>{item?.title}</Text>

        <View style={{marginTop:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Text style={{fontSize:15,fontWeight:'bold'}}>₹{item?.price}</Text>
          <Text style={{color:'#ffc72c',fontWeight:'bold'}}>{item?.rating?.rate} rating</Text>
        </View>

        <Pressable onPress={()=>addItemToCart(item)} style={{backgroundColor:'#ffc72c',padding:10,borderRadius:20,alignItems:'center',justifyContent:'center',marginHorizontal:10,marginTop:10}}>
        {addedToCart
                ?
                (<Text>Added to Cart</Text>)
                :(<Text>Add to Cart</Text>)
                }
        </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({})