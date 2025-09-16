import { StatusBar } from 'expo-status-bar';
import { Router } from './router/RouterProvider';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

console.log('app mounted', { 
  env: process.env.EXPO_PUBLIC_APOLLO_URI,
})


const App = () => {
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, zIndex: 9999, background: 'yellow'}}>Hello World</div>
      <Router basename="/rate-repository-app">
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </Router>
      <StatusBar style="auto" />
    </>
  )
};

export default App;