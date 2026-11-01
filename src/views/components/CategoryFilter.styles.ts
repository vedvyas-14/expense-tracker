import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';

export const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    color: colors.text,
    fontSize: 13,
  },
  textActive: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
});