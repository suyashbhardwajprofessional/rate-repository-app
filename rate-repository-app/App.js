import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const apolloClient = createApolloClient();
const App = () => {
  loadDevMessages();
  loadErrorMessages();
  
  console.log("The expo config is ", Constants.expoConfig);
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
