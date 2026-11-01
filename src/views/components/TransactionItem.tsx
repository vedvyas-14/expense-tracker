import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Transaction } from '../../model/types';
import { categoryColors, colors, radius, spacing } from '../../theme/theme';
import { formatDate, formatMoney } from '../../utils/format';
import { styles } from './TransactionItem.styles';

interface Props {
  transaction: Transaction;
  onLongPress: () => void;
}

export default function TransactionItem({ transaction: t, onLongPress }: Props) {
  const isIncome = t.type === 'income';
  const badgeColor = isIncome ? colors.income : categoryColors[t.category] ?? colors.textMuted;

  const scale = useRef(new Animated.Value(1)).current;

  // Slowly shrink while the finger is down (long-press takes ~500ms).
  const handlePressIn = () =>
    Animated.timing(scale, { toValue: 0.96, duration: 400, useNativeDriver: true }).start();

  // Spring back on release, or if the touch is cancelled.
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={onLongPress}
        style={styles.item}
      >
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{t.category.charAt(0)}</Text>
        </View>

        <View style={styles.middle}>
          <Text style={styles.category}>{t.category}</Text>
          <Text style={styles.sub} numberOfLines={1}>
            {t.description ? `${t.description} · ` : ''}
            {formatDate(t.date)}
          </Text>
        </View>

        <Text style={[styles.amount, { color: isIncome ? colors.income : colors.expense }]}>
          {isIncome ? '+' : '-'}
          {formatMoney(t.amount)}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
