import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { padding: spacing.lg, paddingBottom: 100 },
  heading: { color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: spacing.lg },
  headingAccent: { color: colors.primary },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: spacing.sm, marginBottom: spacing.md },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: spacing.xl,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.pill,
    elevation: 6,
  },
  fabText: { color: colors.onPrimary, fontWeight: '800', fontSize: 16 },
});