import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/images'
import styles from './styles'

const cardData = [
    {
        id: 1,
        title: "Fund Wallet",
        image: icons.Group
    },

     {
        id: 2,
        title: "Send Money",
        image: icons.Group
    },
     {
        id: 3,
        title: "Airtime",
        image: icons.Group
    },
     {
        id: 4,
        title: "Data",
        image: icons.Group
    },
     {
        id: 5,
        title: "Loan",
        image: icons.Group
    },
     {
        id: 6,
        title: "More",
        image: icons.Group
    }
]

const Card = () => {
  return (
    <View style={styles.container}>
        {cardData.map((item) => (
            <View key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
            </View>
        ))}
    </View>
  )
}

export default Card

