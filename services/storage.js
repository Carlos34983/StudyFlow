
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@studyflow:tasks';

export async function getTasks() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    return [];
  }
}

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas:', error);
  }
}
