import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  LogBox,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from 'expo-location'; // Import Location module

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// LogBox.ignoreAllLogs();

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Handle received notification here
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // Handle notification response here
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    getLocationPermission(); // Request location permission when component mounts
  }, []);

  async function getLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      return;
    }
  }

  async function onMessage(event) {
    const data = event.nativeEvent.data;
    await schedulePushNotification(data);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <SafeAreaView style={{ flex: 1 }} scalesPageToFit={false}>
        <WebView
          showsVerticalScrollIndicator={false}
          scalesPageToFit={false}
          mixedContentMode="compatibility"
          onMessage={onMessage}
          source={{ uri: "http://10.120.116.167:3000" }}
        />
      </SafeAreaView>
    </>
  );
}

async function schedulePushNotification(details) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "I am in danger",
      body: `Sent by ${details}`,
      data: { data: details },
      sound: "default", // or specify a sound file
    },
    trigger: { seconds: 1 },
  });
}
