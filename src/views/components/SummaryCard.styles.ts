import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';

export const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  smallCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
  },
  balance: {
    fontSize: 34,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  smallValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
});