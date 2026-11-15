
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function StatCard({ title, value, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  description: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
