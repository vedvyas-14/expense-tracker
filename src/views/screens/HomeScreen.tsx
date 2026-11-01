import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Transaction } from '../../model/types';
import { colors } from '../../theme/theme';
import { formatMoney } from '../../utils/format';
import { useHomeViewModel } from '../../viewmodels/useHomeViewModel';
import { styles } from './HomeScreen.styles'

import AddTransactionModal from '../components/AddTransactionModal';
import CategoryChart from '../components/CategoryChart';
import CategoryFilter from '../components/CategoryFilter';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';

export default function HomeScreen() {
  const vm = useHomeViewModel();
  const [modalVisible, setModalVisible] = useState(false);

  const confirmDelete = (t: Transaction) =>
    Alert.alert('Delete transaction?', `${t.category} · ${formatMoney(t.amount)}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => vm.deleteTransaction(t.id) },
    ]);

  if (vm.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={vm.transactions}
        keyExtractor={(t) => t.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TransactionItem transaction={item} onLongPress={() => confirmDelete(item)} />
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>
              Expense <Text style={styles.headingAccent}>Tracker</Text>
            </Text>
            <SummaryCard {...vm.totals} />
            <CategoryChart data={vm.chartData} />

            <Text style={styles.sectionTitle}>Transactions</Text>
            {vm.hasTransactions && (
              <>
                <CategoryFilter
                  categories={vm.categories}
                  selected={vm.selectedCategory}
                  onSelect={vm.selectCategory}
                />
                <Text style={styles.hint}>Long-press a transaction to delete it</Text>
              </>
            )}
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            {vm.hasTransactions
              ? 'No transactions in this category.'
              : 'No transactions yet. Tap “Add” to create one.'}
          </Text>
        }
      />

      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+ Add</Text>
      </Pressable>

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={vm.addTransaction}
      />
    </SafeAreaView>
  );
}

