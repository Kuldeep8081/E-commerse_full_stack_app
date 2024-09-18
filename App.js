import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './store';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';

export default function App() {
  const [loaded] = useFonts({
    'outfit-regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
          <ModalPortal />
        </UserContext>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
