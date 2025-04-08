import AppBarTab from './AppBarTab';
import AppBarContainer from './AppBarContainer';
import { ScrollView } from 'react-native';

const AppBar = () => {
  return (
    <AppBarContainer>
      <ScrollView horizontal={true}>
        <AppBarTab titled="SignIn" leadTo="signin" />
        <AppBarTab titled="Repositories" leadTo="repositories" />
      </ScrollView>
    </AppBarContainer>
    );
};

export default AppBar;