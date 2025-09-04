import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Define the types for your props
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

interface UserListProps {
  users: User[];
  transactions: Transaction[];
  onAddUser: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, transactions, onAddUser }) => {
  return (
    <View style={styles.usersContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Users</Text>
        <TouchableOpacity onPress={onAddUser}>
          <Text style={styles.seeAllText}>Add New</Text>
        </TouchableOpacity>
      </View>

      {users.map(user => (
        <View key={user.id} style={styles.userItem}>
          <View style={styles.userIcon}>
            <Icon name="account" size={24} color="#7c4dff" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userPhone}>{user.phone}</Text>
          </View>
          <View style={styles.userStats}>
            <Text style={styles.userStat}>
              Lent: ${transactions
                .filter(t => t.userId === user.id && t.type === 'lend')
                .reduce((sum, t) => sum + t.amount, 0)}
            </Text>
            <Text style={styles.userStat}>
              Borrowed: ${transactions
                .filter(t => t.userId === user.id && t.type === 'borrow')
                .reduce((sum, t) => sum + t.amount, 0)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  usersContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#7c4dff',
    fontSize: 14,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
  },
  userEmail: {
    color: '#9e9ea7',
    fontSize: 12,
    marginBottom: 2,
  },
  userPhone: {
    color: '#9e9ea7',
    fontSize: 12,
  },
  userStats: {
    alignItems: 'flex-end',
  },
  userStat: {
    color: '#9e9ea7',
    fontSize: 10,
    marginBottom: 2,
  },
});

export default UserList;