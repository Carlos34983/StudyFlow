
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import colors from '../../constants/colors';

function TabLabel({ focused, children }) {
  return (
    <Text
      style={{
        color: focused ? colors.primary : colors.textSecondary,
        fontSize: 12,
        fontWeight: focused ? 'bold' : 'normal',
      }}
    >
      {children}
    </Text>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Início',
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused}>Início</TabLabel>
          ),
        }}
      />

      <Tabs.Screen
        name="tarefas"
        options={{
          title: 'Tarefas',
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused}>Tarefas</TabLabel>
          ),
        }}
      />

      <Tabs.Screen
        name="nova-tarefa"
        options={{
          title: 'Adicionar',
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused}>Adicionar</TabLabel>
          ),
        }}
      />
    </Tabs>
  );
}
