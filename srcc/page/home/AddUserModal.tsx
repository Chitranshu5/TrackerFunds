// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';

// interface AddUserModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onAddUser: (user: { name: string; email: string; phone: string }) => void;
// }

// const AddUserModal: React.FC<AddUserModalProps> = ({ visible, onClose, onAddUser }) => {
//   const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

//   const handleAddUser = () => {
//     if (!newUser.name || !newUser.email) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }
    
//     onAddUser(newUser);
//     setNewUser({ name: '', email: '', phone: '' });
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
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
//               onPress={onClose}
//             >
//               <Text style={styles.buttonText}>Cancel</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.modalButton, styles.confirmButton]} 
//               onPress={handleAddUser}
//             >
//               <Text style={styles.buttonText}>Add User</Text>
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
//   input: {
//     backgroundColor: '#2a2a2a',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 15,
//     color: '#fff',
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

// export default AddUserModal;
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';

import Realm from 'realm';            // 👈 Explicit import
import { useRealm } from '@realm/react';
import { User } from '../../bd/User'; // your schema

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ visible, onClose }) => {
  const realm = useRealm(); 
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      realm.write(() => {
        const createdUser = realm.create(User, {
          _id: new Realm.BSON.ObjectId(),
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone || '',
        });

        console.log('✅ User added to Realm:', {
          id: createdUser._id.toHexString(),
          name: createdUser.name,
          email: createdUser.email,
          phone: createdUser.phone,
        });
      });

      setNewUser({ name: '', email: '', phone: '' });
      onClose();
    } catch (e) {
      console.error('❌ Error adding user:', e);
      Alert.alert('Error', 'Failed to save user');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New User</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name *"
            value={newUser.name}
            onChangeText={text => setNewUser({ ...newUser, name: text })}
            placeholderTextColor="#9e9ea7"
          />

          <TextInput
            style={styles.input}
            placeholder="Email *"
            value={newUser.email}
            onChangeText={text => setNewUser({ ...newUser, email: text })}
            keyboardType="email-address"
            placeholderTextColor="#9e9ea7"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={newUser.phone}
            onChangeText={text => setNewUser({ ...newUser, phone: text })}
            keyboardType="phone-pad"
            placeholderTextColor="#9e9ea7"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleAddUser}
            >
              <Text style={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddUserModal;

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
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: '#fff',
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
