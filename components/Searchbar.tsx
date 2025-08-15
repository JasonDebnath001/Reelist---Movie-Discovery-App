import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
    placeholder: string
    onPress?: () => void
    value?: string
    onChangeText?: (text: string) => void
    onSubmitEditing?: () => void // Crucial for manual search
}

const Searchbar = ({placeholder, onPress, value, onChangeText, onSubmitEditing}: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={'#ab8bff'} />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#a8b5db'}
        className='flex-1 ml-2 text-white'
        // These two props trigger the search on keyboard submission
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
      />
    </View>
  )
}

export default Searchbar