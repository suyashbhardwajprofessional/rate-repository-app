import AppBarTab from './AppBarTab';
import AppBarContainer from './AppBarContainer';
import { ScrollView } from 'react-native';
import { ME } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

const AppBar = () => {
  const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const [loginStatusTitle, setLoginStatusTitle] = useState('LogIn')

  useEffect(()=>{
    data && data.me ? setLoginStatusTitle('SignOut') : setLoginStatusTitle('SignIn')
  },[data])

  return (
    <AppBarContainer>
      <ScrollView horizontal={true}>
        <AppBarTab titled={loginStatusTitle} leadTo="signin" />
        <AppBarTab titled="Repositories" leadTo="repositories" />
      </ScrollView>
    </AppBarContainer>
    );
};

export default AppBar;