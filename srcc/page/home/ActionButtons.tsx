import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ActionButtonsProps {
  onAddUser: () => void;
  onAddTransaction: () => void;
}

export default function ActionButtons({ onAddUser, onAddTransaction }: ActionButtonsProps) {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onAddUser}
      >
        <View style={[styles.actionIcon, { backgroundColor: 'rgba(124, 77, 255, 0.2)' }]}>
          <Icon name="account-plus" size={24} color="#7c4dff" />
        </View>
        <Text style={styles.actionText}>Add User</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onAddTransaction}
      >
        <View style={[styles.actionIcon, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
          <Icon name="plus-circle" size={24} color="#4caf50" />
        </View>
        <Text style={styles.actionText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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