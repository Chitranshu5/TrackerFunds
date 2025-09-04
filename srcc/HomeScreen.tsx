// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   ScrollView, 
//   TouchableOpacity, 
//   TextInput, 
//   Modal,
//   Alert
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // Sample initial data
// const initialUsers = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
//   { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', phone: '987-654-3210' },
//   { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '555-123-4567' },
// ];

// const initialTransactions = [
//   { id: 1, userId: 1, userName: 'John Doe', type: 'lend', amount: 500, date: '2023-10-15', description: 'Loan for car repair' },
//   { id: 2, userId: 2, userName: 'Sarah Smith', type: 'borrow', amount: 300, date: '2023-10-10', description: 'Borrowed for rent' },
//   { id: 3, userId: 3, userName: 'Mike Johnson', type: 'deposit', amount: 1200, date: '2023-10-05', description: 'Monthly savings' },
//   { id: 4, userId: 1, userName: 'John Doe', type: 'lend', amount: 750, date: '2023-10-01', description: 'Business loan' },
// ];

// export default function HomeScreen() {
//   const [users, setUsers] = useState(initialUsers);
//   const [transactions, setTransactions] = useState(initialTransactions);
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [showTransactionForm, setShowTransactionForm] = useState(false);
//   const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
//   const [newTransaction, setNewTransaction] = useState({ 
//     userId: '', type: 'lend', amount: '', description: '' 
//   });

//   // Calculate totals
//   const totalLent = transactions
//     .filter(t => t.type === 'lend')
//     .reduce((sum, t) => sum + t.amount, 0);
    
//   const totalBorrowed = transactions
//     .filter(t => t.type === 'borrow')
//     .reduce((sum, t) => sum + t.amount, 0);
    
//   const totalDeposited = transactions
//     .filter(t => t.type === 'deposit')
//     .reduce((sum, t) => sum + t.amount, 0);
    
//   const netBalance = totalDeposited + totalLent - totalBorrowed;

//   // Add new user
//   const addUser = () => {
//     if (!newUser.name || !newUser.email) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }
    
//     const user = {
//       id: users.length + 1,
//       name: newUser.name,
//       email: newUser.email,
//       phone: newUser.phone
//     };
    
//     setUsers([...users, user]);
//     setNewUser({ name: '', email: '', phone: '' });
//     setShowUserForm(false);
//     Alert.alert('Success', 'User added successfully');
//   };

//   // Add new transaction
//   const addTransaction = () => {
//     if (!newTransaction.userId || !newTransaction.amount) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }
    
//     const user = users.find(u => u.id === parseInt(newTransaction.userId));
//     if (!user) {
//       Alert.alert('Error', 'User not found');
//       return;
//     }
    
//     const transaction = {
//       id: transactions.length + 1,
//       userId: parseInt(newTransaction.userId),
//       userName: user.name,
//       type: newTransaction.type,
//       amount: parseFloat(newTransaction.amount),
//       date: new Date().toISOString().split('T')[0],
//       description: newTransaction.description
//     };
    
//     setTransactions([...transactions, transaction]);
//     setNewTransaction({ userId: '', type: 'lend', amount: '', description: '' });
//     setShowTransactionForm(false);
//     Alert.alert('Success', 'Transaction added successfully');
//   };

//   // Render user form modal
//   const renderUserForm = () => (
//     <Modal visible={showUserForm} animationType="slide" transparent>
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Add New User</Text>
          
//           <TextInput
//             style={styles.input}
//             placeholder="Full Name *"
//             value={newUser.name}
//             onChangeText={text => setNewUser({...newUser, name: text})}
//             placeholderTextColor="#9e9ea7"
//           />
          
//           <TextInput
//             style={styles.input}
//             placeholder="Email *"
//             value={newUser.email}
//             onChangeText={text => setNewUser({...newUser, email: text})}
//             keyboardType="email-address"
//             placeholderTextColor="#9e9ea7"
//           />
          
//           <TextInput
//             style={styles.input}
//             placeholder="Phone"
//             value={newUser.phone}
//             onChangeText={text => setNewUser({...newUser, phone: text})}
//             keyboardType="phone-pad"
//             placeholderTextColor="#9e9ea7"
//           />
          
//           <View style={styles.modalButtons}>
//             <TouchableOpacity 
//               style={[styles.modalButton, styles.cancelButton]} 
//               onPress={() => setShowUserForm(false)}
//             >
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.modalButton, styles.confirmButton]} 
//               onPress={addUser}
//             >
//               <Text style={styles.buttonText}>Add User</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );

//   // Render transaction form modal
//   const renderTransactionForm = () => (
//     <Modal visible={showTransactionForm} animationType="slide" transparent>
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Add New Transaction</Text>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>User *</Text>
//             <View style={styles.picker}>
//               {users.map(user => (
//                 <TouchableOpacity
//                   key={user.id}
//                   style={[
//                     styles.userOption,
//                     newTransaction.userId === user.id.toString() && styles.selectedOption
//                   ]}
//                   onPress={() => setNewTransaction({...newTransaction, userId: user.id.toString()})}
//                 >
//                   <Text style={styles.optionText}>{user.name}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
          
//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Type *</Text>
//             <View style={styles.typeSelector}>
//               <TouchableOpacity
//                 style={[
//                   styles.typeButton,
//                   newTransaction.type === 'lend' && styles.typeButtonActive
//                 ]}
//                 onPress={() => setNewTransaction({...newTransaction, type: 'lend'})}
//               >
//                 <Text style={styles.typeButtonText}>Lend</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 style={[
//                   styles.typeButton,
//                   newTransaction.type === 'borrow' && styles.typeButtonActive
//                 ]}
//                 onPress={() => setNewTransaction({...newTransaction, type: 'borrow'})}
//               >
//                 <Text style={styles.typeButtonText}>Borrow</Text>
//               </TouchableOpacity>
              
//               <TouchableOpacity
//                 style={[
//                   styles.typeButton,
//                   newTransaction.type === 'deposit' && styles.typeButtonActive
//                 ]}
//                 onPress={() => setNewTransaction({...newTransaction, type: 'deposit'})}
//               >
//                 <Text style={styles.typeButtonText}>Deposit</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
          
//           <TextInput
//             style={styles.input}
//             placeholder="Amount *"
//             value={newTransaction.amount}
//             onChangeText={text => setNewTransaction({...newTransaction, amount: text})}
//             keyboardType="numeric"
//             placeholderTextColor="#9e9ea7"
//           />
          
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             placeholder="Description"
//             value={newTransaction.description}
//             onChangeText={text => setNewTransaction({...newTransaction, description: text})}
//             multiline
//             placeholderTextColor="#9e9ea7"
//           />
          
//           <View style={styles.modalButtons}>
//             <TouchableOpacity 
//               style={[styles.modalButton, styles.cancelButton]} 
//               onPress={() => setShowTransactionForm(false)}
//             >
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.modalButton, styles.confirmButton]} 
//               onPress={addTransaction}
//             >
//               <Text style={styles.buttonText}>Add Transaction</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );

//   return (
//     <View style={styles.screen}>
//       <ScrollView style={styles.container}>
//         {/* Header with Net Balance */}
//         <View style={styles.header}>
//           <Text style={styles.balanceLabel}>Net Balance</Text>
//           <Text style={styles.balanceAmount}>${netBalance.toLocaleString()}</Text>
//           <View style={styles.balanceChange}>
//             <Icon 
//               name={netBalance >= 0 ? "trending-up" : "trending-down"} 
//               size={16} 
//               color={netBalance >= 0 ? "#4caf50" : "#ff5252"} 
//             />
//             <Text style={[
//               styles.balanceChangeText, 
//               { color: netBalance >= 0 ? "#4caf50" : "#ff5252" }
//             ]}>
//               {netBalance >= 0 ? 'Positive' : 'Negative'} Balance
//             </Text>
//           </View>
//         </View>

//         {/* Quick Stats */}
//         <View style={styles.statsContainer}>
//           <View style={styles.statCard}>
//             <View style={[styles.statIcon, { backgroundColor: 'rgba(124, 77, 255, 0.2)' }]}>
//               <Icon name="cash-plus" size={24} color="#7c4dff" />
//             </View>
//             <Text style={styles.statAmount}>${totalLent}</Text>
//             <Text style={styles.statLabel}>Total Lent</Text>
//           </View>

//           <View style={styles.statCard}>
//             <View style={[styles.statIcon, { backgroundColor: 'rgba(255, 109, 74, 0.2)' }]}>
//               <Icon name="cash-minus" size={24} color="#ff6d4a" />
//             </View>
//             <Text style={styles.statAmount}>${totalBorrowed}</Text>
//             <Text style={styles.statLabel}>Total Borrowed</Text>
//           </View>

//           <View style={styles.statCard}>
//             <View style={[styles.statIcon, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
//               <Icon name="bank" size={24} color="#4caf50" />
//             </View>
//             <Text style={styles.statAmount}>${totalDeposited}</Text>
//             <Text style={styles.statLabel}>Total Deposited</Text>
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actionsContainer}>
//           <TouchableOpacity 
//             style={styles.actionButton}
//             onPress={() => setShowUserForm(true)}
//           >
//             <View style={[styles.actionIcon, { backgroundColor: 'rgba(124, 77, 255, 0.2)' }]}>
//               <Icon name="account-plus" size={24} color="#7c4dff" />
//             </View>
//             <Text style={styles.actionText}>Add User</Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.actionButton}
//             onPress={() => setShowTransactionForm(true)}
//           >
//             <View style={[styles.actionIcon, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
//               <Icon name="plus-circle" size={24} color="#4caf50" />
//             </View>
//             <Text style={styles.actionText}>Add Transaction</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Recent Transactions */}
//         <View style={styles.transactionsContainer}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Transactions</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAllText}>See All</Text>
//             </TouchableOpacity>
//           </View>

//           {transactions.slice(0, 5).map(transaction => {
//             const getIconName = () => {
//               if (transaction.type === 'lend') return 'arrow-top-right';
//               if (transaction.type === 'borrow') return 'arrow-bottom-left';
//               return 'bank-transfer';
//             };

//             const getIconColor = () => {
//               if (transaction.type === 'lend') return '#7c4dff';
//               if (transaction.type === 'borrow') return '#ff6d4a';
//               return '#4caf50';
//             };

//             return (
//               <View key={transaction.id} style={styles.transactionItem}>
//                 <View style={styles.transactionIcon}>
//                   <Icon name={getIconName()} size={20} color={getIconColor()} />
//                 </View>
//                 <View style={styles.transactionDetails}>
//                   <Text style={styles.transactionName}>{transaction.userName}</Text>
//                   <Text style={styles.transactionDate}>{transaction.date}</Text>
//                   <Text style={styles.transactionDesc}>{transaction.description}</Text>
//                 </View>
//                 <View style={styles.transactionAmountContainer}>
//                   <Text style={[
//                     styles.transactionAmount,
//                     { color: transaction.type === 'borrow' ? '#ff6d4a' : '#7c4dff' }
//                   ]}>
//                     {transaction.type === 'borrow' ? '-' : '+'}${transaction.amount}
//                   </Text>
//                   <Text style={[
//                     styles.transactionType,
//                     { 
//                       backgroundColor: transaction.type === 'lend' 
//                         ? 'rgba(124, 77, 255, 0.2)' 
//                         : transaction.type === 'borrow'
//                         ? 'rgba(255, 109, 74, 0.2)'
//                         : 'rgba(76, 175, 80, 0.2)'
//                     }
//                   ]}>
//                     {transaction.type}
//                   </Text>
//                 </View>
//               </View>
//             );
//           })}
//         </View>

//         {/* Users List */}
//         <View style={styles.usersContainer}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Users</Text>
//             <TouchableOpacity onPress={() => setShowUserForm(true)}>
//               <Text style={styles.seeAllText}>Add New</Text>
//             </TouchableOpacity>
//           </View>

//           {users.map(user => (
//             <View key={user.id} style={styles.userItem}>
//               <View style={styles.userIcon}>
//                 <Icon name="account" size={24} color="#7c4dff" />
//               </View>
//               <View style={styles.userDetails}>
//                 <Text style={styles.userName}>{user.name}</Text>
//                 <Text style={styles.userEmail}>{user.email}</Text>
//                 <Text style={styles.userPhone}>{user.phone}</Text>
//               </View>
//               <View style={styles.userStats}>
//                 <Text style={styles.userStat}>
//                   Lent: ${transactions
//                     .filter(t => t.userId === user.id && t.type === 'lend')
//                     .reduce((sum, t) => sum + t.amount, 0)}
//                 </Text>
//                 <Text style={styles.userStat}>
//                   Borrowed: ${transactions
//                     .filter(t => t.userId === user.id && t.type === 'borrow')
//                     .reduce((sum, t) => sum + t.amount, 0)}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Modals */}
//       {renderUserForm()}
//       {renderTransactionForm()}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#0f0f0f',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     backgroundColor: '#1a1a1a',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   balanceLabel: {
//     color: '#9e9ea7',
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   balanceAmount: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   balanceChange: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   balanceChangeText: {
//     marginLeft: 5,
//     fontSize: 14,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   statCard: {
//     backgroundColor: '#1a1a1a',
//     borderRadius: 16,
//     padding: 15,
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   statIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   statAmount: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   statLabel: {
//     color: '#9e9ea7',
//     fontSize: 12,
//   },
//   actionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   actionButton: {
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 10,
//   },
//   actionIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   actionText: {
//     color: '#fff',
//     fontSize: 12,
//   },
//   transactionsContainer: {
//     backgroundColor: '#1a1a1a',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//   },
//   usersContainer: {
//     backgroundColor: '#1a1a1a',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   seeAllText: {
//     color: '#7c4dff',
//     fontSize: 14,
//   },
//   transactionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2a2a2a',
//   },
//   transactionIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#2a2a2a',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   transactionDetails: {
//     flex: 1,
//   },
//   transactionName: {
//     color: '#fff',
//     fontSize: 16,
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
//   },
//   transactionAmountContainer: {
//     alignItems: 'flex-end',
//   },
//   transactionAmount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   transactionType: {
//     fontSize: 10,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 10,
//     color: '#fff',
//     overflow: 'hidden',
//   },
//   userItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#2a2a2a',
//   },
//   userIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#2a2a2a',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   userDetails: {
//     flex: 1,
//   },
//   userName: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 2,
//   },
//   userEmail: {
//     color: '#9e9ea7',
//     fontSize: 12,
//     marginBottom: 2,
//   },
//   userPhone: {
//     color: '#9e9ea7',
//     fontSize: 12,
//   },
//   userStats: {
//     alignItems: 'flex-end',
//   },
//   userStat: {
//     color: '#9e9ea7',
//     fontSize: 10,
//     marginBottom: 2,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   modalContent: {
//     width: '100%',
//     backgroundColor: '#1a1a1a',
//     borderRadius: 16,
//     padding: 20,
//   },
//   modalTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#2a2a2a',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 15,
//     color: '#fff',
//   },
//   textArea: {
//     height: 80,
//     textAlignVertical: 'top',
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     color: '#9e9ea7',
//     marginBottom: 8,
//     fontSize: 14,
//   },
//   picker: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   userOption: {
//     backgroundColor: '#2a2a2a',
//     padding: 10,
//     borderRadius: 8,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   selectedOption: {
//     backgroundColor: '#7c4dff',
//   },
//   optionText: {
//     color: '#fff',
//   },
//   typeSelector: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   typeButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: '#2a2a2a',
//     alignItems: 'center',
//     marginHorizontal: 4,
//   },
//   typeButtonActive: {
//     backgroundColor: '#7c4dff',
//   },
//   typeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   modalButton: {
//     flex: 1,
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   cancelButton: {
//     backgroundColor: '#2a2a2a',
//   },
//   confirmButton: {
//     backgroundColor: '#7c4dff',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TransactionList from './page/home/TransactionsList';
import UserList from './page/home/UsersList';
import AddUserModal from './page/home/AddUserModal';
import AddTransactionModal from './page/home/AddTransactionModal';
import { useNavigation } from '@react-navigation/native';
import { initialTransactions, initialUsers } from '../ApiData';

// Define the types for your data
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Transaction {
  id: number;
  userId: number;
  userName: string;
  type: 'lend' | 'borrow' | 'deposit';
  amount: number;
  date: string;
  description: string;
}



export default function HomeScreen() {
  const navigation = useNavigation();
 const [users, setUsers] = useState<User[]>(initialUsers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  // Calculate totals
  const totalLent = transactions
    .filter(t => t.type === 'lend')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalBorrowed = transactions
    .filter(t => t.type === 'borrow')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalDeposited = transactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const netBalance = totalDeposited + totalLent - totalBorrowed;

  // Add new user
  const addUser = (newUser: { name: string; email: string; phone: string }) => {
    const user: User = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    };
    
    setUsers([...users, user]);
    setShowUserForm(false);
    Alert.alert('Success', 'User added successfully');
  };

  // Add new transaction
  const addTransaction = (newTransaction: { userId: string; type: string; amount: string; description: string }) => {
    const user = users.find(u => u.id === parseInt(newTransaction.userId));
    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }
    
    const transaction: Transaction = {
      id: transactions.length + 1,
      userId: parseInt(newTransaction.userId),
      userName: user.name,
      type: newTransaction.type as 'lend' | 'borrow' | 'deposit',
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString().split('T')[0],
      description: newTransaction.description
    };
    
    setTransactions([...transactions, transaction]);
    setShowTransactionForm(false);
    Alert.alert('Success', 'Transaction added successfully');
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        {/* Header with Net Balance */}
        <View style={styles.header}>
          <Text style={styles.balanceLabel}>Net Balance</Text>
          <Text style={styles.balanceAmount}>${netBalance.toLocaleString()}</Text>
          <View style={styles.balanceChange}>
            <Icon 
              name={netBalance >= 0 ? "trending-up" : "trending-down"} 
              size={16} 
              color={netBalance >= 0 ? "#4caf50" : "#ff5252"} 
            />
            <Text style={[
              styles.balanceChangeText, 
              { color: netBalance >= 0 ? "#4caf50" : "#ff5252" }
            ]}>
              {netBalance >= 0 ? 'Positive' : 'Negative'} Balance
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(124, 77, 255, 0.2)' }]}>
              <Icon name="cash-plus" size={24} color="#7c4dff" />
            </View>
            <Text style={styles.statAmount}>${totalLent}</Text>
            <Text style={styles.statLabel}>Total Lent</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(255, 109, 74, 0.2)' }]}>
              <Icon name="cash-minus" size={24} color="#ff6d4a" />
            </View>
            <Text style={styles.statAmount}>${totalBorrowed}</Text>
            <Text style={styles.statLabel}>Total Borrowed</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
              <Icon name="bank" size={24} color="#4caf50" />
            </View>
            <Text style={styles.statAmount}>${totalDeposited}</Text>
            <Text style={styles.statLabel}>Total Deposited</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowUserForm(true)}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(124, 77, 255, 0.2)' }]}>
              <Icon name="account-plus" size={24} color="#7c4dff" />
            </View>
            <Text style={styles.actionText}>Add User</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setShowTransactionForm(true)}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
              <Icon name="plus-circle" size={24} color="#4caf50" />
            </View>
            <Text style={styles.actionText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <TransactionList transactions={transactions} onSeeAll={()=>navigation.navigate('Trans')} />

        {/* Users List */}
        <UserList users={users} transactions={transactions} onAddUser={() => setShowUserForm(true)} />
      </ScrollView>

      {/* Modals */}
      <AddUserModal 
        visible={showUserForm} 
        onClose={() => setShowUserForm(false)} 
        onAddUser={addUser} 
      />
      <AddTransactionModal
        visible={showTransactionForm} 
        onClose={() => setShowTransactionForm(false)} 
        onAddTransaction={addTransaction}
        users={users}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#9e9ea7',
    fontSize: 14,
    marginBottom: 5,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceChangeText: {
    marginLeft: 5,
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statAmount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#9e9ea7',
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
  },
});