import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Transaction } from '../../../ApiData';



interface TransactionListProps {
  transactions: Transaction[];
  onSeeAll?: () => void; // optional handler for "See All"
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onSeeAll }) => {
  const renderTransaction = ({ item }: { item: Transaction }) => {
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

    return (
      <View style={styles.transactionItem}>
        {/* Icon */}
        <View style={styles.transactionIcon}>
          <Icon name={getIconName()} size={22} color={getIconColor()} />
        </View>

        {/* Details */}
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>{item.userName}</Text>
          {/* <Text style={styles.transactionDate}>{item.date}</Text> */}
          <Text style={styles.transactionDesc}>{item.description}</Text>
          <Text style={styles.transactionId}>ID: #{item.id}</Text>
        </View>

        {/* Amount + Type + Category */}
        <View style={styles.transactionAmountContainer}>
          <Text
            style={[
              styles.transactionAmount,
              { color: item.type === 'borrow' ? '#ff6d4a' : '#7c4dff' },
            ]}
          >
            {item.type === 'borrow' ? '-' : '+'}${item.amount}
          </Text>

          <Text
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
            {item.type}
          </Text>

          {item.category && (
            <Text style={styles.transactionCategory}>{item.category}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.transactionsContainer}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Show only 5 transactions */}
      <FlatList
        data={transactions.slice(0, 2)}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false} // no scroll, fixed 5 items
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsContainer: {
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
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
  },
  transactionDate: {
    color: '#9e9ea7',
    fontSize: 12,
    marginBottom: 2,
  },
  transactionDesc: {
    color: '#9e9ea7',
    fontSize: 12,
    fontStyle: 'italic',
  },
  transactionId: {
    color: '#7c4dff',
    fontSize: 11,
    marginTop: 2,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    color: '#fff',
    overflow: 'hidden',
    textTransform: 'capitalize',
    marginBottom: 3,
  },
  transactionCategory: {
    fontSize: 10,
    color: '#4caf50',
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    textTransform: 'capitalize',
  },
});

export default TransactionList;
