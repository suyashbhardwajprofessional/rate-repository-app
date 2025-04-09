import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);
const App = () => {
  loadDevMessages();
  loadErrorMessages();
  
  console.log("The expo config is ", Constants.expoConfig);
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
