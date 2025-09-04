
// import React, { useRef, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Animated, Easing, Dimensions } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const { width, height } = Dimensions.get('window');

// // Mock data since we don't have the actual ApiData
// const initialTransactions = [
//   { id: 1, userId: 1, userName: 'John Doe', type: 'lend', amount: 150, date: '2023-06-15', description: 'Lunch' },
//   { id: 2, userId: 2, userName: 'Jane Smith', type: 'borrow', amount: 75, date: '2023-06-14', description: 'Concert tickets' },
//   { id: 3, userId: 3, userName: 'Mike Johnson', type: 'deposit', amount: 200, date: '2023-06-13', description: 'Salary' },
//   { id: 4, userId: 4, userName: 'Sarah Wilson', type: 'lend', amount: 50, date: '2023-06-12', description: 'Book purchase' },
//   { id: 5, userId: 5, userName: 'Alex Brown', type: 'borrow', amount: 125, date: '2023-06-11', description: 'Dinner' },
//   { id: 6, userId: 6, userName: 'Emily Davis', type: 'deposit', amount: 300, date: '2023-06-10', description: 'Freelance work' },
//   { id: 7, userId: 7, userName: 'Chris Wilson', type: 'lend', amount: 80, date: '2023-06-09', description: 'Movie tickets' },
//   { id: 8, userId: 8, userName: 'Emma Thompson', type: 'borrow', amount: 45, date: '2023-06-08', description: 'Coffee' },
// ];

// interface Transaction {
//   id: number;
//   userId: number;
//   userName: string;
//   type: 'lend' | 'borrow' | 'deposit';
//   amount: number;
//   date: string;
//   description: string;
//   category?: string;
// }

// export default function TransactionScreen() {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const [data, setData] = useState<Transaction[]>([]);

//   useEffect(() => {
//     // Animate header and list in on component mount
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       })
//     ]).start();

//     // Load data with a slight delay for better animation effect
//     const timer = setTimeout(() => {
//       setData(initialTransactions);
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, []);

//   const headerScrollAnimation = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [0, -50],
//     extrapolate: 'clamp',
//   });

//   const headerOpacityAnimation = scrollY.interpolate({
//     inputRange: [0, 80],
//     outputRange: [1, 0],
//     extrapolate: 'clamp',
//   });

//   const TransactionItem = ({ item, index }: { item: Transaction; index: number }) => {
//     const itemAnim = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//       Animated.timing(itemAnim, {
//         toValue: 1,
//         duration: 500,
//         delay: index * 100,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }).start();
//     }, []);

//     const getIconName = () => {
//       if (item.type === 'lend') return 'arrow-top-right';
//       if (item.type === 'borrow') return 'arrow-bottom-left';
//       return 'bank-transfer';
//     };

//     const getIconColor = () => {
//       if (item.type === 'lend') return '#7c4dff';
//       if (item.type === 'borrow') return '#ff6d4a';
//       return '#4caf50';
//     };

//     // Scroll animation for each item
//     const itemScrollAnimation = scrollY.interpolate({
//       inputRange: [-1, 0, 150 * index, 150 * (index + 2)],
//       outputRange: [1, 1, 1, 0.9],
//     });

//     const itemOpacityAnimation = scrollY.interpolate({
//       inputRange: [-1, 0, 150 * index, 150 * (index + 1.5)],
//       outputRange: [1, 1, 1, 0],
//     });

//     return (
//       <Animated.View style={[
//         styles.transactionItem, 
//         { 
//           opacity: Animated.multiply(itemAnim, itemOpacityAnimation),
//           transform: [
//             { 
//               translateX: itemAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [300, 0]
//               })
//             },
//             {
//               scale: itemScrollAnimation
//             }
//           ]
//         }
//       ]}>
//         <View style={[
//           styles.transactionIcon,
//           { backgroundColor: item.type === 'lend' 
//             ? 'rgba(124, 77, 255, 0.2)' 
//             : item.type === 'borrow' 
//             ? 'rgba(255, 109, 74, 0.2)' 
//             : 'rgba(76, 175, 80, 0.2)' }
//           ]}>
//           <Icon name={getIconName()} size={22} color={getIconColor()} />
//         </View>
//         <View style={styles.transactionDetails}>
//           <Text style={styles.transactionName}>{item.userName}</Text>
//           <Text style={styles.transactionDate}>{item.date}</Text>
//           <Text style={styles.transactionDesc} numberOfLines={1} ellipsizeMode="tail">
//             {item.description}
//           </Text>
//         </View>
//         <View style={styles.transactionAmountContainer}>
//           <Text
//             style={[
//               styles.transactionAmount,
//               { color: item.type === 'borrow' ? '#ff6d4a' : '#7c4dff' },
//             ]}
//           >
//             {item.type === 'borrow' ? '-' : '+'}${item.amount.toFixed(2)}
//           </Text>
//           <View style={[
//             styles.transactionType,
//             {
//               backgroundColor:
//                 item.type === 'lend'
//                   ? 'rgba(124, 77, 255, 0.2)'
//                   : item.type === 'borrow'
//                   ? 'rgba(255, 109, 74, 0.2)'
//                   : 'rgba(76, 175, 80, 0.2)',
//             },
//           ]}>
//             <Text style={styles.transactionTypeText}>
//               {item.type}
//             </Text>
//           </View>
//         </View>
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[
//         styles.headerContainer,
//         { 
//           opacity: Animated.multiply(fadeAnim, headerOpacityAnimation),
//           transform: [
//             { translateY: slideAnim },
//             { translateY: headerScrollAnimation }
//           ] 
//         }
//       ]}>
//         <Text style={styles.header}>All Transactions</Text>
//         <View style={styles.headerLine} />
//       </Animated.View>
      
//       {data.length > 0 ? (
//         <Animated.FlatList
//           data={data}
//           renderItem={({ item, index }) => <TransactionItem item={item} index={index} />}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.listContent}
//           scrollEventThrottle={16}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//             { useNativeDriver: true }
//           )}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         <Animated.View style={[styles.placeholderContainer, { opacity: fadeAnim }]}>
//           <Text style={styles.placeholderText}>Loading transactions...</Text>
//         </Animated.View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#121212', 
//     padding: 16 
//   },
//   headerContainer: {
//     marginBottom: 24,
//     position: 'absolute',
//     top: 16,
//     left: 16,
//     right: 16,
//     zIndex: 10,
//   },
//   header: { 
//     fontSize: 28, 
//     fontWeight: '800', 
//     color: '#fff', 
//     marginBottom: 8,
//     letterSpacing: 0.5,
//   },
//   headerLine: {
//     height: 4,
//     width: 40,
//     backgroundColor: '#7c4dff',
//     borderRadius: 2,
//   },
//   listContent: { 
//     paddingBottom: 20,
//     paddingTop: 80, // Add padding to account for the absolute header
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2a2a2a',
//     backgroundColor: '#1e1e1e',
//     borderRadius: 12,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   transactionIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   transactionDetails: { 
//     flex: 1,
//     justifyContent: 'center',
//   },
//   transactionName: { 
//     color: '#fff', 
//     fontSize: 16, 
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   transactionDate: { 
//     color: '#9e9ea7', 
//     fontSize: 12, 
//     marginBottom: 4,
//   },
//   transactionDesc: { 
//     color: '#9e9ea7', 
//     fontSize: 12, 
//     fontStyle: 'italic',
//     maxWidth: '90%',
//   },
//   transactionAmountContainer: { 
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//   },
//   transactionAmount: { 
//     fontSize: 16, 
//     fontWeight: '700', 
//     marginBottom: 6,
//   },
//   transactionType: {
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   transactionTypeText: {
//     fontSize: 10,
//     fontWeight: '600',
//     color: '#fff',
//     textTransform: 'capitalize',
//   },
//   placeholderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderText: {
//     color: '#9e9ea7',
//     fontSize: 16,
//   },
// });

import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Realm from 'realm';
import Transaction from './bd/Transaction';

const { width, height } = Dimensions.get('window');

export default function TransactionScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    // Animate header and list in on component mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    let realm: Realm;

    const openRealm = async () => {
      realm = await Realm.open({ schema: [Transaction] });
      const transactions = realm.objects<Transaction>('Transaction').sorted('date', true);

      // Initial load
      setData([...transactions]);

      // Listener for real-time updates
      transactions.addListener((col) => {
        setData([...col]);
      });
    };

    openRealm();

    return () => {
      if (realm && !realm.isClosed) {
        realm.close();
      }
    };
  }, []);

  const headerScrollAnimation = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const headerOpacityAnimation = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const TransactionItem = ({ item, index }: { item: Transaction; index: number }) => {
    const itemAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(itemAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, []);

    const getIconName = () => {
      if (item.type === 'lend') return 'arrow-top-right';
      if (item.type === 'borrow') return 'arrow-bottom-left';
      return 'bank-transfer';
    };

    const getIconColor = () => {
      if (item.type === 'lend') return '#7c4dff';
      if (item.type === 'borrow') return '#ff6d4a';
      return '#4caf50';
    };

    const itemScrollAnimation = scrollY.interpolate({
      inputRange: [-1, 0, 150 * index, 150 * (index + 2)],
      outputRange: [1, 1, 1, 0.9],
    });

    const itemOpacityAnimation = scrollY.interpolate({
      inputRange: [-1, 0, 150 * index, 150 * (index + 1.5)],
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={[
          styles.transactionItem,
          {
            opacity: Animated.multiply(itemAnim, itemOpacityAnimation),
            transform: [
              {
                translateX: itemAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
              {
                scale: itemScrollAnimation,
              },
            ],
          },
        ]}
      >
        <View
          style={[
            styles.transactionIcon,
            {
              backgroundColor:
                item.type === 'lend'
                  ? 'rgba(124, 77, 255, 0.2)'
                  : item.type === 'borrow'
                  ? 'rgba(255, 109, 74, 0.2)'
                  : 'rgba(76, 175, 80, 0.2)',
            },
          ]}
        >
          <Icon name={getIconName()} size={22} color={getIconColor()} />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>{item.userName}</Text>
          <Text style={styles.transactionDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text
            style={styles.transactionDesc}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </View>
        <View style={styles.transactionAmountContainer}>
          <Text
            style={[
              styles.transactionAmount,
              { color: item.type === 'borrow' ? '#ff6d4a' : '#7c4dff' },
            ]}
          >
            {item.type === 'borrow' ? '-' : '+'}${item.amount.toFixed(2)}
          </Text>
          <View
            style={[
              styles.transactionType,
              {
                backgroundColor:
                  item.type === 'lend'
                    ? 'rgba(124, 77, 255, 0.2)'
                    : item.type === 'borrow'
                    ? 'rgba(255, 109, 74, 0.2)'
                    : 'rgba(76, 175, 80, 0.2)',
              },
            ]}
          >
            <Text style={styles.transactionTypeText}>{item.type}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: Animated.multiply(fadeAnim, headerOpacityAnimation),
            transform: [{ translateY: slideAnim }, { translateY: headerScrollAnimation }],
          },
        ]}
      >
        <Text style={styles.header}>All Transactions</Text>
        <View style={styles.headerLine} />
      </Animated.View>

      {data.length > 0 ? (
        <Animated.FlatList
          data={data}
          renderItem={({ item, index }) => <TransactionItem item={item} index={index} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Animated.View style={[styles.placeholderContainer, { opacity: fadeAnim }]}>
          <Text style={styles.placeholderText}>No transactions found...</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  headerLine: {
    height: 4,
    width: 40,
    backgroundColor: '#7c4dff',
    borderRadius: 2,
  },
  listContent: {
    paddingBottom: 20,
    paddingTop: 80,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  transactionName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDate: {
    color: '#9e9ea7',
    fontSize: 12,
    marginBottom: 4,
  },
  transactionDesc: {
    color: '#9e9ea7',
    fontSize: 12,
    fontStyle: 'italic',
    maxWidth: '90%',
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  transactionType: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#9e9ea7',
    fontSize: 16,
  },
});
