import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const authorizationOne = new AuthStorage('authorizationOne');
const apolloClient = createApolloClient(authorizationOne);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {
  loadDevMessages();
  loadErrorMessages();

  console.log('The expo config is ', Constants.expoConfig);
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authorizationOne}>
            <PaperProvider theme={theme}>
              <Main />
            </PaperProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
