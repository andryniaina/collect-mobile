import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  BlankForms,
  FormPage
} from './screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DBProvider from './services/provider/DbProvider';


const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  

  return (
    <DBProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard}  options={{ headerShown: false }} />
        <Stack.Screen name="BlankForms" component={BlankForms}  options={{ headerShown: false }} />
        <Stack.Screen name="FormPage" component={FormPage}  options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </DBProvider>
  );
}

export default App;