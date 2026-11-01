import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/theme';
import { formatMoney } from '../../utils/format';
import { styles } from './SummaryCard.styles';

interface Props {
  income: number;
  expense: number;
  balance: number;
}

export default function SummaryCard({ income, expense, balance }: Props) {
  return (
    <View>
      <View style={styles.balanceCard}>
        <Text style={styles.label}>Current balance</Text>
        <Text
          style={[
            styles.balance,
            { color: balance < 0 ? colors.expense : colors.primary },
          ]}
        >
          {formatMoney(balance)}
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.label}>Income</Text>
          <Text style={[styles.smallValue, { color: colors.income }]}>
            {formatMoney(income)}
          </Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.label}>Expenses</Text>
          <Text style={[styles.smallValue, { color: colors.expense }]}>
            {formatMoney(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
}
