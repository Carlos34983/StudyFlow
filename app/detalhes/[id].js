
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';

import colors from '../../constants/colors';
import { getTasks, saveTasks } from '../../services/storage';

export default function Detalhes() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadTask() {
        const tasks = await getTasks();
        const foundTask = tasks.find((item) => item.id === id);

        setTask(foundTask || null);
        setLoading(false);
      }

      loadTask();
    }, [id])
  );

  async function toggleCompleted() {
    const tasks = await getTasks();

    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    await saveTasks(updatedTasks);

    const updatedTask = updatedTasks.find((item) => item.id === id);
    setTask(updatedTask);
  }

  async function deleteTask() {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter((item) => item.id !== id);

    await saveTasks(updatedTasks);
    router.replace('/tarefas');
  }

  function confirmDelete() {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm(
      'Tem certeza de que deseja excluir esta tarefa?'
    );

    if (confirmed) {
      deleteTask();
    }

    return;
  }

  Alert.alert(
    'Excluir tarefa',
    'Tem certeza de que deseja excluir esta atividade?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: deleteTask,
      },
    ]
  );
}

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.normalText}>Carregando tarefa...</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Tarefa não encontrada</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/tarefas')}
        >
          <Text style={styles.actionText}>Voltar às tarefas</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Detalhes da tarefa</Text>
      <Text style={styles.subtitle}>Informações da sua atividade.</Text>

      <View style={styles.card}>
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

        <Text style={styles.taskTitle}>{task.title}</Text>

        <Text style={styles.label}>Matéria</Text>
        <Text style={styles.value}>{task.subject || 'Não informada'}</Text>

        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.value}>
          {task.description || 'Nenhuma descrição informada.'}
        </Text>

        <Text style={styles.label}>Prazo</Text>
        <Text style={styles.value}>{task.date || 'Não definido'}</Text>
      </View>

      <TouchableOpacity
        style={styles.completeButton}
        onPress={toggleCompleted}
      >
        <Text style={styles.actionText}>
          {task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={confirmDelete}
      >
        <Text style={styles.deleteText}>Excluir tarefa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 35,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
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
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 28,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 18,
  },
  pending: {
    backgroundColor: '#FFF3DC',
  },
  completed: {
    backgroundColor: colors.primaryLight,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#A66B13',
  },
  completedText: {
    color: colors.primary,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginTop: 15,
    marginBottom: 5,
  },
  value: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  completeButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 22,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FCEAEA',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteText: {
    color: colors.danger,
    fontWeight: 'bold',
    fontSize: 14,
  },
  backButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  backText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  normalText: {
    color: colors.textSecondary,
  },
});
