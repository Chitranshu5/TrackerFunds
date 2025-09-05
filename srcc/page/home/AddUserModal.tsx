import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
  onAddUser: (newUser: { name: string; email: string; phone: string }) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ visible, onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '' });
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (visible) {
      // Reset animations when modal becomes visible
      slideAnim.setValue(0);
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
      
      // Run entrance animations
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Run exit animations
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [visible]);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      // Add a subtle shake animation when validation fails
      const shake = new Animated.Value(0);
      Animated.sequence([
        Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true })
      ]).start();
      
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Pass user data to parent
    onAddUser(newUser);

    // Reset fields and close modal
    setNewUser({ name: '', email: '', phone: '' });
    onClose();
  };

  // Interpolate animation values
  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0]
  });

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [
      { translateY: translateY },
      { scale: scaleAnim }
    ]
  };

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, animatedStyle]}>
            <Text style={styles.modalTitle}>Add New User</Text>

            <KeyboardAvoidingView 
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
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
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={newUser.phone}
                onChangeText={text => setNewUser({ ...newUser, phone: text })}
                keyboardType="phone-pad"
                placeholderTextColor="#9e9ea7"
              />
            </KeyboardAvoidingView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddUser}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Add User</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
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