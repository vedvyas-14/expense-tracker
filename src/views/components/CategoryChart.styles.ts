import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';

export const CHART_SIZE = 160;
export const CHART_STROKE = 22;
export const CHART_RADIUS = (CHART_SIZE - CHART_STROKE) / 2;

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  empty: {
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  chart: {
    width: CHART_SIZE,
    height: CHART_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    width: CHART_RADIUS * 1.5,
  },
  centerLabel: {
    color: colors.textMuted,
    fontSize: 11,
  },
  centerValue: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  legend: {
    flex: 1,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },
  legendName: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
  },
  legendValue: {
    color: colors.textMuted,
    fontSize: 13,
  },
});