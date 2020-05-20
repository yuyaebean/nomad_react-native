import React, { useState } from 'react'
import { Image, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import Stack from './navigation/Stack'

const cacheImages = (images: any[]) =>
  images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })

const cacheFonts = (fonts: any[]) => fonts.map(font => Font.loadAsync(font))

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false)

  function loadAssets(): Promise<any> {
    const images = cacheImages([require('./assets/splash.png')])
    const fonts = cacheFonts([Ionicons.font])

    return Promise.all([...images, ...fonts])
  }

  function onFinish() {
    setIsReady(true)
  }

  return isReady ? (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle='light-content' />
    </>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.error}
    />
  )
}
