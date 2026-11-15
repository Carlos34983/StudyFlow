import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import colors from '../../constants/colors';
import StatCard from '../../components/StatCard';
import { getTasks } from '../../services/storage';

export default function Home() {
  const router = useRouter();

  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function loadTasks() {
        const savedTasks = await getTasks();
        setTasks(savedTasks);
      }

      loadTasks();
    }, [])
  );

  const pending = tasks.filter((task) => !task.completed).length;
  const completed = tasks.filter((task) => task.completed).length;
  const total = tasks.length;

  const progress = total > 0
    ? Math.round((completed / total) * 100)
    : 0;

  const nextTask = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      return dateA - dateB;
    })[0];

  function parseDate(date) {
    if (!date || !/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      return new Date(8640000000000000);
    }

    const [day, month, year] = date.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, estudante!</Text>
            <Text style={styles.subtitle}>
              Organize seus estudos.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Resumo das atividades
        </Text>

        <View style={styles.stats}>
          <StatCard
            title="Pendentes"
            value={String(pending).padStart(2, '0')}
            description="Tarefas em aberto"
          />

          <StatCard
            title="Concluídas"
            value={String(completed).padStart(2, '0')}
            description="Tarefas finalizadas"
          />
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>
              Seu progresso
            </Text>

            <Text style={styles.progressPercent}>
              {progress}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <Text style={styles.progressDescription}>
            {total === 0
              ? 'Cadastre sua primeira tarefa para acompanhar seu progresso.'
              : 'Continue assim! Você está avançando nos estudos.'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Acesso rápido
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/nova-tarefa')}
        >
          <Text style={styles.primaryButtonText}>
            + Nova tarefa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/tarefas')}
        >
          <Text style={styles.secondaryButtonText}>
            Ver minhas tarefas
          </Text>
        </TouchableOpacity>

        <View style={styles.nextCard}>
          <Text style={styles.nextLabel}>
            PRÓXIMA ATIVIDADE
          </Text>

          {nextTask ? (
            <>
              <Text style={styles.nextTitle}>
                {nextTask.title}
              </Text>

              <Text style={styles.nextDate}>
                {nextTask.date
                  ? `Prazo: ${nextTask.date}`
                  : 'Prazo não definido'}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.nextTitle}>
                Nenhuma tarefa pendente
              </Text>

              <Text style={styles.nextDate}>
                Você está em dia com suas atividades.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 14,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  progressCard: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 14,
    marginTop: 22,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  progressPercent: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressBackground: {
    height: 9,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    marginTop: 14,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  progressDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
    fontSize: 15,
  },
  nextCard: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: 14,
    marginTop: 28,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nextLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
  },
  nextTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
  },
  nextDate: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
  },
});
