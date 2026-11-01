import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';

export const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.sm },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: colors.onPrimary, fontWeight: '800' },
  middle: { flex: 1, marginHorizontal: spacing.md },
  category: { color: colors.text, fontSize: 15, fontWeight: '600' },
  sub: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '700' },
});