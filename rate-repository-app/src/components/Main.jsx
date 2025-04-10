import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Routes, Route, Navigate } from 'react-router-native'
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e5e8'
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <View style={{flex: 1, marginTop: 1}}>
        <Routes>
          <Route path='/repositories' element={<RepositoryList />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='*' element={<Navigate to='/signin' replace />} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;