
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

export default function TaskCard({ task, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.subject}>{task.subject || 'Sem matéria'}</Text>
          <Text style={styles.date}>Prazo: {task.date || 'Não definido'}</Text>
        </View>

        <View
          style={[
            styles.status,
            task.completed ? styles.completed : styles.pending,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              task.completed ? styles.completedText : styles.pendingText,
            ]}
          >
            {task.completed ? 'Concluída' : 'Pendente'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  subject: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 5,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pending: {
    backgroundColor: '#FFF3DC',
  },
  completed: {
    backgroundColor: colors.primaryLight,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#A66B13',
  },
  completedText: {
    color: colors.primary,
  },
});
