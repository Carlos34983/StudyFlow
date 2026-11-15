
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

import colors from '../../constants/colors';
import TaskCard from '../../components/TaskCard';
import { getTasks } from '../../services/storage';

export default function Tarefas() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Todas');

  useFocusEffect(
    useCallback(() => {
      async function loadTasks() {
        const savedTasks = await getTasks();
        setTasks(savedTasks);
      }

      loadTasks();
    }, [])
  );

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pendentes') return !task.completed;
    if (filter === 'Concluídas') return task.completed;
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas tarefas</Text>
      <Text style={styles.subtitle}>
        Acompanhe suas atividades de estudo.
      </Text>

      <View style={styles.filters}>
        {['Todas', 'Pendentes', 'Concluídas'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() =>
              router.push({
                pathname: '/detalhes/[id]',
                params: { id: item.id },
              })
            }
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nenhuma tarefa encontrada</Text>
            <Text style={styles.emptyText}>
              Cadastre uma atividade para começar a organizar seus estudos.
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/nova-tarefa')}
      >
        <Text style={styles.addButtonText}>+ Nova tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 25,
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  list: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  empty: {
    alignItems: 'center',
    padding: 25,
    marginTop: 35,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
