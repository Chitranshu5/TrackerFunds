import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  netBalance: number;
}

export default function Header({ netBalance }: HeaderProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});