import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NewTransaction, TransactionType } from '../../model/types';
import { colors } from '../../theme/theme';
import { CURRENCY_SYMBOL, formatDate } from '../../utils/format';
import { useAddTransactionViewModel } from '../../viewmodels/useAddTransactionViewModel';
import { styles } from './AddTransactionModal.styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (t: NewTransaction) => void;
}

const TYPES: TransactionType[] = ['expense', 'income'];

export default function AddTransactionModal({ visible, onClose, onSubmit }: Props) {
  const vm = useAddTransactionViewModel(onSubmit);

  const close = () => {
    vm.reset();
    onClose();
  };

  const handleSave = () => {
    if (vm.submit()) onClose();
  };

  // Android has no inline picker component, so it opens a native dialog.
  const openAndroidPicker = () =>
    DateTimePickerAndroid.open({
      value: vm.date,
      mode: 'date',
      maximumDate: new Date(),
      onChange: (_, selected) => selected && vm.setDate(selected),
    });

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      {/* Modals render in their own window, so they get their own provider. */}
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.header}>
              <Text style={styles.title}>New transaction</Text>
              <Pressable onPress={close} hitSlop={10}>
                <Text style={styles.cancel}>Cancel</Text>
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
              {/* Type toggle */}
              <View style={styles.toggle}>
                {TYPES.map((t) => {
                  const active = vm.type === t;
                  const activeColor = t === 'income' ? colors.income : colors.expense;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => vm.setType(t)}
                      style={[styles.toggleBtn, active && { backgroundColor: activeColor }]}
                    >
                      <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
                        {t === 'income' ? 'Income' : 'Expense'}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Amount */}
              <Text style={styles.label}>Amount</Text>
              <View style={styles.amountRow}>
                <Text style={styles.currency}>{CURRENCY_SYMBOL}</Text>
                <TextInput
                  style={styles.amountInput}
                  value={vm.amount}
                  onChangeText={vm.setAmount}
                  placeholder="0.00"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="decimal-pad"
                />
              </View>

              {/* Category */}
              <Text style={styles.label}>Category</Text>
              <View style={styles.chips}>
                {vm.availableCategories.map((c) => {
                  const active = c === vm.category;
                  return (
                    <Pressable
                      key={c}
                      onPress={() => vm.setCategory(c)}
                      style={[styles.chip, active && styles.chipActive]}
                    >
                      <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Date */}
              <Text style={styles.label}>Date</Text>
              {Platform.OS === 'ios' ? (
                <View style={styles.iosDate}>
                  <DateTimePicker
                    value={vm.date}
                    mode="date"
                    display="compact"
                    themeVariant="dark"
                    maximumDate={new Date()}
                    onChange={(_, selected) => selected && vm.setDate(selected)}
                  />
                </View>
              ) : (
                <Pressable style={styles.input} onPress={openAndroidPicker}>
                  <Text style={styles.inputText}>{formatDate(vm.date.toISOString())}</Text>
                </Pressable>
              )}

              {/* Description */}
              <Text style={styles.label}>Description (optional)</Text>
              <TextInput
                style={[styles.input, styles.inputText]}
                value={vm.description}
                onChangeText={vm.setDescription}
                placeholder="e.g. Lunch with team"
                placeholderTextColor={colors.textMuted}
                maxLength={80}
              />

              {vm.error ? <Text style={styles.error}>{vm.error}</Text> : null}

              <Pressable style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save transaction</Text>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
}