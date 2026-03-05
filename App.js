import { StyleSheet, View } from 'react-native';
import NumberInputScreen from './components/number-input';
import HomeScreen from './components/home-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider> 
      <View style={styles.container}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Phone">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Phone" component={NumberInputScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
