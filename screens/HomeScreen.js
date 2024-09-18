import { Image, Platform, Pressable, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Colors from '../Utills/Colors';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import Heading from '../components/Heading';
import ProductItems from '../components/ProductItems';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BottomModal, ModalContent, SlideAnimation } from 'react-native-modals';
import { Entypo } from '@expo/vector-icons';
export default function HomeScreen() {

  const Categorieslist = [
    {
      id: "0",
      image: require("./../assets/Images/CategoriesImages/Electronics.png"),
      name: "Electronics"
    },
    {
      id: "1",
      image: require("./../assets/Images/CategoriesImages/Bed.jpg"),
      name: "BedSets"
    },
    {
      id: "2",
      image: require("./../assets/Images/CategoriesImages/SofaSet.jpg"),
      name: "SofaSets"
    },
    {
      id: "3",
      image: require("./../assets/Images/CategoriesImages/TrunkSet.jpg"),
      name: "TrunkSets"
    },
    {
      id: "4",
      image: require("./../assets/Images/CategoriesImages/almirah.jpg"),
      name: "Almirah"
    },

  ];

  const SliderBoxlist = [
    { id: "5", image: require("./../assets/Images/SliderBox/1.jpg") },
    { id: "6", image: require("./../assets/Images/SliderBox/2.jpg") },
    { id: "7", image: require("./../assets/Images/SliderBox/3.jpg") },
  ];

  const Deals = [
    {
      id: "8",
      title: "this is a wooden double bed",
      oldprice: "25,000",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      color:"red",
      offer: "50%",
      carouselImages:[
        require("./../assets/Images/Deals/Deal1.jpg"),
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      price: '20,000',
      size: "6x6",
      image: require("./../assets/Images/Deals/Deal1.jpg"),

    },
    {
      id: "9",
      title: "this is a steel Almirah",
      oldprice: "12,000",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      color:"red",
      offer: "50%",
      carouselImages:[
        require("./../assets/Images/Deals/almirah.png"),
        require("./../assets/Images/Deals/Deal1.jpg"),
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      price: '10,000',
      size: "6x4",
      image: require("./../assets/Images/Deals/almirah.png"),
    },
    {
      id: "10",
      title: "this is a Sofa set",
      oldprice: "18,000",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      color:"red",
      offer: "50%",
      carouselImages:[
        require("./../assets/Images/Deals/Deal3Sofa.jpg"),
        require("./../assets/Images/Deals/almirah.png"),
        require("./../assets/Images/Deals/Deal1.jpg"),
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      price: '15,000',
      size: "12x12",
      image: require("./../assets/Images/Deals/Deal3Sofa.jpg"),

    },
    {
      id: "11",
      title: "this is a cooler",
      oldprice: "18,000",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      color:"red",
      offer: "50%",
      carouselImages:[
        require("./../assets/Images/Deals/cooler.jpg"),
        require("./../assets/Images/Deals/Deal3Sofa.jpg"),
        require("./../assets/Images/Deals/almirah.png"),
        require("./../assets/Images/Deals/Deal1.jpg"),
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      price: '12,000',
      size: "3x2",
      image: require("./../assets/Images/Deals/cooler.jpg"),

    },
  ];

  const Offers = [
    {
      id: "13",
      title: "this is a steel Almirah",
      oldprice: "6,000",
      carouselImages:[
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      price: '5,000',
      size: "4x3",
      offer: "50%",
      color:"red",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      image: require("./../assets/Images/DealseOfDay/almirah.jpeg"),
    },
    {
      id: "14",
      title: "this is a high speed ceiling Fan",
      oldprice: "1,800",
      carouselImages:[
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      price: '1,300',
      size: "Big",
      color:"red",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      offer: "39%",
      image: require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
    },
    {
      id: "15",
      title: "this is a high quality Mixer",
      oldprice: "1,800",
      carouselImages:[
        require("./../assets/Images/DealseOfDay/Mixel.jpg"),
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      price: '1,300',
      size: "medium",
      offer: "30%",
      color:"red",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      image: require("./../assets/Images/DealseOfDay/Mixel.jpg"),
    },
    {
      id: "16",
      title: "this is a high quality press",
      oldprice: "600",
      price: '400',
      carouselImages:[
        require("./../assets/Images/DealseOfDay/press.jpg"),
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      size: "medium",
      offer: "40%",
      color:"red",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      image: require("./../assets/Images/DealseOfDay/press.jpg"),
    },
    {
      id: "17",
      title: "this is a high quality SofaSet",
      oldprice: "30,000",
      carouselImages:[
        require("./../assets/Images/DealseOfDay/Sofaset.jpg"),
        require("./../assets/Images/DealseOfDay/press.jpg"),
        require("./../assets/Images/DealseOfDay/almirah.jpeg"),
        require("./../assets/Images/DealseOfDay/ceilingFan.jpeg"),
      ],
      price: '25,000',
      size: "12x12",
      offer: "60%",
      color:"red",
      freeDelivery:"FREE delivery Tomorrow by 3 PM. Order Within 10hrs 30mins",
      image: require("./../assets/Images/DealseOfDay/Sofaset.jpg"),
    },
  ];
  const navigation=useNavigation();
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products")
        setProducts(response.data);
      } catch (error) {
        console.log("error message ", error);
      }
    }
    fetchData();
  }, [])
  
  const onGenderOpen=useCallback(()=>{
    setCompanyOpen(false);
  },[])
   
  const cart=useSelector((state)=>state.cart.cart);
  console.log(cart);
  const [modalVisible,setModalVisible]=useState(false);

  // console.log("Products is",products);
  return (
    <>
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, backgroundColor: 'white' }}
    
    >
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

        <Pressable
        onPress={()=>setModalVisible(!modalVisible)}
         style={{ flexDirection: 'row', gap: 5, padding: 10, backgroundColor: "#F8EDED" }}>
          <Ionicons name="location-outline" size={24} color="black" />
          <View>
            <Text>Deliver to Kuldeep - PratapGarh 230141</Text>
          </View>
          <AntDesign name="down" size={24} color="black" />

        </Pressable>

        {/* //SliderBox */}
        <Swiper showsButtons={true} style={styles.swiper}>
          {SliderBoxlist.map((item, index) => (
            <View
              style={styles.slide}
              key={index}>
              <Image
                style={styles.image}
                source={item?.image}
              />
            </View>
          ))}
        </Swiper>
        <View style={{ borderColor: Colors.LIGHT_GRAY, borderTopWidth: 4, marginTop: 20 }}></View>
        {/* //Categories */}
        <Heading text={'Categories'} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Categorieslist.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => console.log(`Pressed ${item?.name}`)}
              style={{ margin: 12, justifyContent: 'center', alignItems: 'center' }}
            >
              <Image style={{ width: 60, height: 60, borderRadius: 99, resizeMode: 'contain' }} source={item?.image} />
              <Text style={{}}>{item?.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={{ borderColor: Colors.LIGHT_GRAY, borderTopWidth: 4, marginTop: 20 }}></View>

        {/* Deals */}
        <Heading text={'Trending Deals of The Month'} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          {
            Deals.map((item, index) => (
              <Pressable 
              onPress={()=>navigation.navigate("Info",{
                id:item?.id,
                title:item?.title,
                price:item?.price,
                carouselImages:item?.carouselImages,
                size:item?.size,
                oldprice:item?.oldprice,
                item:item,
                offer:item?.offer,
                color:item?.color,
                freeDelivery:item?.freeDelivery,
              })} key={index} style={{ marginTop: 25 }}>
                <Image
                  style={{ height: 160, width: 160, borderColor: Colors.PRIMARY, borderRadius: 5, borderWidth: 1, resizeMode: 'contain' }}
                  source={item?.image} />
              </Pressable>
            ))
          }
        </View>
        {/* this is border line */}
        <View style={{ borderColor: Colors.LIGHT_GRAY, borderTopWidth: 4, marginTop: 20 }}></View>

        {/* offers */}
        <Heading text={"Today's Deals"} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Offers.map((item, index) => (
            <Pressable onPress={()=>navigation.navigate("Info",{
              id:item?.id,
              title:item?.title,
              price:item?.price,
              carouselImages:item?.carouselImages,
              size:item?.size,
              oldprice:item?.oldprice,
              item:item,
              offer:item?.offer,
              color:item?.color,
              freeDelivery:item?.freeDelivery,
            })} style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center', margin: 10, borderColor: Colors.GRAY, borderWidth: 1.5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <Image style={{ width: 150, height: 150, resizeMode: 'contain', borderTopRightRadius: 10, borderTopLeftRadius: 10 }} source={item?.image} />

              <View style={{ width: '100%', backgroundColor: "red" }}>
                <Text style={{ textAlign: 'center', padding: 5, color: Colors.WHITE }}>Upto {item?.offer} Off</Text>
              </View>
            </Pressable>
          ))
          }
        </ScrollView>

        {/* this api fetched content */}
        <View style={{ borderColor: Colors.LIGHT_GRAY, borderTopWidth: 4, marginTop: 20 }}></View>

        <View style={{
          marginTop:20,
          marginHorizontal: 10,
          width: "45%",
          marginBottom: open ? 50 : 15,
        }}>
          <DropDownPicker
            style={{
              borderColor: "#787878",
              height: 30,
              marginBottom: open ? 120 : 15,
            }}
            open={open}
            value={category} // or genderValue, depending on the context
            items={items}
            setOpen={setOpen}
            setValue={setCategory} // or setGender, depending on the context
            setItems={setItems}
            placeholder="Choose category" // or "Choose gender"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            zIndex={3000}
            zIndexInverse={1000}
          />
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {products?.filter((item)=>item.category===category)
          .map((item, index) => (
              <ProductItems item={item} key={index} />

            ))}

            {/* or if filter not required */}

          {/* {
            products?.map((item, index) => (
              <ProductItems item={item} key={index} />
            ))
          } */}
        </View>


      </ScrollView>
    </SafeAreaView>
   
   {/* Creating modal */}
    <BottomModal
    onBackdropPress={()=>setModalVisible(!modalVisible)}
    swipeDirection={["up","down"]}
    swipeThreshold={200}
    modalAnimation={
      new SlideAnimation({
          slideFrom:'bottom'
      })
    }

    onHardwareBackPress={()=>setModalVisible(!modalVisible)}
    visible={modalVisible}
    onTouchOutside={()=>setModalVisible(!modalVisible)}
    >
    <ModalContent style={{width:'100%',height:400}}>
      <View style={{marginBottom:8}}>
        <Text style={{fontSize:16,fontWeight:500}}>Choose Your location</Text>
        <Text style={{marginTop:5,fontSize:16,color:'gray'}}>Select delivery location to see product availability and delivery optoins</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* already added addresses */}

        <Pressable 
        onPress={()=>{
          setModalVisible(false)
          navigation.navigate("Address")
        }}
        style={{height:140,width:140,borderColor:"#d0d0d0",marginTop:10,borderWidth:1,padding:10,justifyContent:'center',alignItems:'center'}}>
          <Text style={{textAlign:'center',color:'#0066b2',fontWeight:500}}>
            Add address and pickup point</Text>
        </Pressable>
      </ScrollView>

      <View style={{flexDirection:'column',gap:7,marginBottom:30}} >
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
        <Entypo name="location-pin" size={24} color="#0066b2" />
        <Text style={{color:"#0066b2",fontWeight:500}}>Enter an indian pincode</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
        <Ionicons name="locate-sharp" size={24} color="#0066b2" />
        <Text style={{color:"#0066b2",fontWeight:500}}>
          Use my current location</Text>
        </View>
      </View>
    </ModalContent>
    </BottomModal>
    </>
  )
}

const styles = StyleSheet.create({
  swiper: {
    height: 250,
    backgroundColor: '#EBF4F6',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
})