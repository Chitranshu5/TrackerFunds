// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';

// interface User {
//   id: number;
//   name: string;
// }
 
// interface AddTransactionModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onAddTransaction: (transaction: { userId: string; type: string; amount: string; description: string }) => void;
//   users: User[];
// }

// const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ visible, onClose, onAddTransaction, users }) => {
//   const [newTransaction, setNewTransaction] = useState({ 
//     userId: '', type: 'lend', amount: '', description: '' 
//   });

//   const handleAddTransaction = () => {
//     if (!newTransaction.userId || !newTransaction.amount) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }
    
//     onAddTransaction(newTransaction);
//     setNewTransaction({ userId: '', type: 'lend', amount: '', description: '' });
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
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
//               onPress={onClose}
//             >
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.modalButton, styles.confirmButton]} 
//               onPress={handleAddTransaction}
//             >
//               <Text style={styles.buttonText}>Add Transaction</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
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

// export default AddTransactionModal;


import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from "react-native";
import Realm from "realm";
import Transaction from "../../bd/Transaction";

interface User {
  id: number;
  name: string;
}

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Transaction) => void; // now returns Realm Transaction
  users: User[];
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
  onAddTransaction,
  users,
}) => {
  const [newTransaction, setNewTransaction] = useState({
    userId: "",
    type: "lend",
    amount: "",
    description: "",
  });

  const handleAddTransaction = async () => {
    if (!newTransaction.userId || !newTransaction.amount) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const realm = await Realm.open({
      schema: [Transaction],
    });

    let createdTransaction: Transaction;

    realm.write(() => {
      // Auto-increment ID
      const lastTransaction = realm.objects<Transaction>("Transaction").sorted("id", true)[0];
      const nextId = lastTransaction ? lastTransaction.id + 1 : 1;

      createdTransaction = realm.create("Transaction", {
        id: nextId,
        userId: parseInt(newTransaction.userId, 10),
        userName: users.find((u) => u.id.toString() === newTransaction.userId)?.name || "",
        type: newTransaction.type,
        amount: parseInt(newTransaction.amount, 10),
        date: new Date().toISOString(),
        description: newTransaction.description,
      }) as Transaction;
    });

    // Pass the new transaction back to parent for UI update
    onAddTransaction(createdTransaction);

    setNewTransaction({ userId: "", type: "lend", amount: "", description: "" });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Transaction</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>User *</Text>
            <View style={styles.picker}>
              {users.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={[
                    styles.userOption,
                    newTransaction.userId === user.id.toString() && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setNewTransaction({ ...newTransaction, userId: user.id.toString() })
                  }
                >
                  <Text style={styles.optionText}>{user.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type *</Text>
            <View style={styles.typeSelector}>
              {["lend", "borrow", "deposit"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    newTransaction.type === type && styles.typeButtonActive,
                  ]}
                  onPress={() => setNewTransaction({ ...newTransaction, type })}
                >
                  <Text style={styles.typeButtonText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Amount *"
            value={newTransaction.amount}
            onChangeText={(text) => setNewTransaction({ ...newTransaction, amount: text })}
            keyboardType="numeric"
            placeholderTextColor="#9e9ea7"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={newTransaction.description}
            onChangeText={(text) => setNewTransaction({ ...newTransaction, description: text })}
            multiline
            placeholderTextColor="#9e9ea7"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleAddTransaction}
            >
              <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: '#9e9ea7',
    marginBottom: 8,
    fontSize: 14,
  },
  picker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  userOption: {
    backgroundColor: '#2a2a2a',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#7c4dff',
  },
  optionText: {
    color: '#fff',
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  typeButtonActive: {
    backgroundColor: '#7c4dff',
  },
  typeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#2a2a2a',
  },
  confirmButton: {
    backgroundColor: '#7c4dff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddTransactionModal;
