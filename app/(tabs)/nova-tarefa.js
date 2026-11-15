
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

import colors from '../../constants/colors';
import { getTasks, saveTasks } from '../../services/storage';


function isValidDate(date) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return false;
  }

  const [day, month, year] = date.split('/').map(Number);

  const parsedDate = new Date(year, month - 1, day);

  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  );
}


export default function NovaTarefa() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');

  const [error, setError] = useState('');

 
  async function handleSave() {
    setError('');

    if (!title.trim() || !subject.trim()) {
       setError('Preencha o título e a matéria.');
       return;
    }

    if (date.trim() && !isValidDate(date.trim())) {
       setError('Informe um prazo válido no formato DD/MM/AAAA.');
       return;
    }


    try {
      const tasks = await getTasks();

      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        subject: subject.trim(),
        date: date.trim(),
        completed: false,
      };

      await saveTasks([...tasks, newTask]);

      Alert.alert('Sucesso', 'Tarefa cadastrada com sucesso!');
      router.replace('/tarefas');
    } catch (err) {
      setError('Não foi possível salvar a tarefa.');
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.subtitle}>
        Adicione uma nova atividade à sua rotina de estudos.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Estudar React Native"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
          maxLength={80}
        />

        <Text style={styles.label}>Matéria *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Desenvolvimento Mobile"
          placeholderTextColor={colors.textSecondary}
          value={subject}
          onChangeText={setSubject}
          maxLength={60}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o que precisa estudar..."
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          maxLength={500}
        />

        <Text style={styles.label}>Prazo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 20/11/2026"
          placeholderTextColor={colors.textSecondary}
          value={date}
          onChangeText={setDate}
          maxLength={10}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Salvar tarefa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 21,
  },
  form: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    marginTop: 28,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 13,
    fontSize: 14,
    color: colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 14,
    alignItems: 'center',
    marginTop: 5,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
