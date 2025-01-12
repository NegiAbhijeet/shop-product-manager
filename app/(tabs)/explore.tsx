import { View, Text } from 'react-native'
import React from 'react'
import MyList from "@/components/MyList"
import { SafeAreaView } from 'react-native-safe-area-context'
const explore = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <MyList/>
    </SafeAreaView>
  )
}

export default explore