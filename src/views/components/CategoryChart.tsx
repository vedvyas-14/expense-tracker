import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { CategoryTotal } from '../../model/transactionCalculations';
import { categoryColors, colors } from '../../theme/theme';
import { formatMoney } from '../../utils/format';
import { CHART_RADIUS, CHART_SIZE, CHART_STROKE, styles } from './CategoryChart.styles';

interface Props {
  data: CategoryTotal[];
}

const CIRCUMFERENCE = 2 * Math.PI * CHART_RADIUS;

export default function CategoryChart({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.total, 0);

  // Each slice is a circle outline drawn only part of the way round:
  // dash length = its share of the circumference,
  // offset = combined length of the slices before it.
  let offset = 0;
  const slices = data.map((d) => {
    const length = total > 0 ? (d.total / total) * CIRCUMFERENCE : 0;
    const slice = { ...d, length, offset };
    offset += length;
    return slice;
  });

  const colorFor = (category: string) => categoryColors[category] ?? colors.textMuted;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Expenses by category</Text>

      {total === 0 ? (
        <Text style={styles.empty}>Add an expense to see the breakdown.</Text>
      ) : (
        <View style={styles.content}>
          <View style={styles.chart}>
            <Svg width={CHART_SIZE} height={CHART_SIZE}>
              {/* Rotate so the first slice starts at 12 o'clock */}
              <G rotation={-90} origin={`${CHART_SIZE / 2}, ${CHART_SIZE / 2}`}>
                {slices.map((s) => (
                  <Circle
                    key={s.category}
                    cx={CHART_SIZE / 2}
                    cy={CHART_SIZE / 2}
                    r={CHART_RADIUS}
                    stroke={colorFor(s.category)}
                    strokeWidth={CHART_STROKE}
                    fill="none"
                    strokeDasharray={`${s.length} ${CIRCUMFERENCE - s.length}`}
                    strokeDashoffset={-s.offset}
                  />
                ))}
              </G>
            </Svg>
            <View style={styles.center} pointerEvents="none">
              <Text style={styles.centerLabel}>Spent</Text>
              <Text style={styles.centerValue}>{formatMoney(total)}</Text>
            </View>
          </View>

          <View style={styles.legend}>
            {slices.map((s) => (
              <View key={s.category} style={styles.legendRow}>
                <View style={[styles.dot, { backgroundColor: colorFor(s.category) }]} />
                <Text style={styles.legendName} numberOfLines={1}>
                  {s.category}
                </Text>
                <Text style={styles.legendValue}>{Math.round((s.total / total) * 100)}%</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}