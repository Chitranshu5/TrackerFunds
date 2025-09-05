// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import {
//   NavigationContainer,
//   NavigationContainerRef,
// } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// // --- Screens ---
// function HomeScreen() {
//   return (
//     <View style={styles.screen}>
//       <Text style={styles.screenText}>🏠 Home Screen</Text>
//     </View>
//   );
// }

// function TransScreen() {
//   return (
//     <View style={styles.screen}>
//       <Text style={styles.screenText}>💸 Transaction Screen</Text>
//     </View>
//   );
// }

// function UserScreen() {
//   return (
//     <View style={styles.screen}>
//       <Text style={styles.screenText}>👤 User Screen</Text>
//     </View>
//   );
// }

// // --- Stack Navigator ---
// const Stack = createNativeStackNavigator();

// // --- Tab config ---
// const tabs = [
//   { name: 'Home', icon: 'home-outline', label: 'Home' },
//   { name: 'Trans', icon: 'swap-horizontal-outline', label: 'Trans' },
//   { name: 'User', icon: 'person-outline', label: 'User' },
// ];

// // --- Custom Tab Bar ---
// function CustomTabBar({
//   currentRoute,
//   onNavigate,
// }: {
//   currentRoute: string;
//   onNavigate: (name: string) => void;
// }) {
//   return (
//     <View style={styles.tabBar}>
//       {tabs.map((tab) => {
//         const isFocused = currentRoute === tab.name;

//         return (
//           <TouchableOpacity
//             key={tab.name}
//             onPress={() => onNavigate(tab.name)}
//             style={styles.tabButton}
//           >
//             <Ionicons
//               name={tab.icon}
//               size={24}
//               color={isFocused ? '#6200ee' : '#888'}
//             />
//             <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
//               {tab.label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// // --- App Component ---
// export default function App() {
//   const navigationRef = useRef<NavigationContainerRef<any>>(null);
//   const [currentRoute, setCurrentRoute] = React.useState('Home');

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
//       <NavigationContainer
//         ref={navigationRef}
//         onStateChange={() => {
//           const route = navigationRef.current?.getCurrentRoute();
//           if (route) {
//             setCurrentRoute(route.name);
//           }
//         }}
//       >
//         <View style={styles.container}>
//           <View style={styles.stackContent}>
//             <Stack.Navigator screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="Home" component={HomeScreen} />
//               <Stack.Screen name="Trans" component={TransScreen} />
//               <Stack.Screen name="User" component={UserScreen} />
//             </Stack.Navigator>
//           </View>
//           <CustomTabBar
//             currentRoute={currentRoute}
//             onNavigate={(name) => navigationRef.current?.navigate(name)}
//           />
//         </View>
//       </NavigationContainer>
//     </>
//   );
// }

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   stackContent: {
//     flex: 1,
//   },
//   screen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   screenText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   tabBar: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     paddingVertical: Platform.OS === 'ios' ? 20 : 10,
//     justifyContent: 'space-around',
//     elevation: 10,
//   },
//   tabButton: {
//     alignItems: 'center',
//   },
//   tabLabel: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 4,
//   },
//   tabLabelFocused: {
//     color: '#6200ee',
//     fontWeight: '600',
//   },
// });


import React, {useEffect, useState} from 'react';
import {SafeAreaView, ActivityIndicator, Text} from 'react-native';
import {RealmProvider} from '@realm/react';
import { getOrCreateRealmKey } from './srcc/bd/secure-key';
;
import RootNavigator from './srcc/navigation/RootNavigator';



function KeyGate({children}: {children: React.ReactNode}) {
  const [key, setKey] = useState<Uint8Array | null>(null);

  useEffect(() => {
    (async () => {
      const k = await getOrCreateRealmKey();
      setKey(k);
    })();
  }, []);

  if (!key) {
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 8}}>Loading secure database...</Text>
      </SafeAreaView>
    );
  }

  return (
    <RealmProvider schema={[ ]} path="secureExpense.realm" encryptionKey={key}>
      {children}
    </RealmProvider>
  );
}

export default function App() {
  return (
    // <KeyGate>
      <RootNavigator/>
    // </KeyGate>
  );
}
