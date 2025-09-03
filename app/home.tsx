import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'


const home = () => {
  return (
    <View>
      <Text>home</Text>

      <Image source={images.kuboLogo} />
        {/* <ImageBackground
        source={images.tech}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
      > */}

        {/* Black shadow overlay */}
        {/* <View style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }} /> */}


        

        {/* <AntDesign name="stepbackward" size={24} color="white" />
        <AntDesign name="home" size={24} color="white" />
        <FontAwesome name="home" size={24} color="white" />
        <Feather name="home" size={24} color="red" />
      </ImageBackground> */}
    </View>
  )
}

export default home

const styles = StyleSheet.create({})