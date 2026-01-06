import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import des écrans
import LoginScreen from './src/screens/LoginScreen';
import PlanningScreen from './src/screens/PlanningScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Authentification' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Inscription' }} />
        <Stack.Screen name="Planning" component={PlanningScreen} options={{ title: 'Choix du Sport' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}