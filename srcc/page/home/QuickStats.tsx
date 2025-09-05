import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface QuickStatsProps {
  totalLent: number;
  totalBorrowed: number;
  totalDeposited: number;
}

export default function QuickStats({ totalLent, totalBorrowed, totalDeposited }: QuickStatsProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});