import React, { useRef, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../HomeScreen';
import TransactionScreen from '../TransactionScreen';
import UserScreen from '../UserScreen';

// Custom tab bar
import CustomTabBar from '../componants/CustomTabBar';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [currentRoute, setCurrentRoute] = useState('Home');

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={() => {
          const route = navigationRef.current?.getCurrentRoute();
          if (route) {
            setCurrentRoute(route.name);
          }
        }}
      >
        <View style={styles.container}>
          {/* Stack Screens */}
          <View style={styles.stackContent}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                animation: 'none', // 🚀 instant switch, no flash
                contentStyle: { backgroundColor: '#f8f9fa' },
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Trans" component={TransactionScreen} />
              <Stack.Screen name="User" component={UserScreen} />
            </Stack.Navigator>
          </View>

          {/* Bottom Tab Bar */}
          <CustomTabBar
            currentRoute={currentRoute}
            onNavigate={(name) => navigationRef.current?.navigate(name)}
          />
        </View>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  stackContent: {
    flex: 1,
  },
});
