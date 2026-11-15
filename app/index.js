
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import colors from '../constants/colors';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>StudyFlow</Text>
          <View style={styles.line} />
          <Text style={styles.subtitle}>
            Organize seus estudos.
            {'\n'}
            Acompanhe seu progresso.
          </Text>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace('/dashboard')}
          >
            <Text style={styles.buttonText}>
              Iniciar tarefas
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Seu espaço para organizar e acompanhar atividades.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 25,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: -1,
  },
  line: {
    width: 55,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 25,
    marginTop: 20,
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 18,
  },
});
