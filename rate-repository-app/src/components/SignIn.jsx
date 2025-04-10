import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from './theme';
import useSignIn from '../hooks/useSignIn';
import { useState } from 'react';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'At least a 3 letter username is expected').required('Username is required'),
  password: yup.string().min(1, 'cannot set a black password').required('Password is required'),
});

const SignIn = ({ onSubmit, failureError }) => {
  let hasError = false;
  const formStyle = StyleSheet.create({
    feederField: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: hasError ? '#d73a4a' : 'grey',
      padding: 10,
      margin: 5,
      height: 40,
      borderRadius: 4,
      color: 'grey',
    },
  });

  const buttonStyle = {
    ...formStyle.feederField,
    backgroundColor: theme.colors.fillPrimary,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (<>
    <View style={{ backgroundColor: theme.colors.fillVanilla }}>
      <TextInput
        style={formStyle.feederField}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        error={hasError}
      />

      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a', paddingHorizontal: 10 }}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={formStyle.feederField}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        error={hasError}
      />

      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a', paddingHorizontal: 10 }}>{formik.errors.password}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={buttonStyle}>
        <Text>LogIn</Text>
      </Pressable>
    </View>
    {failureError && (
      <Text style={failureError.message? styles.titleText : styles.baseText}>
        {failureError.message? failureError.message : JSON.stringify(failureError)}
      </Text>
    )}
  </>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const downloadedstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUp: {
    color: '#000',
  },
  signUpLink: {
    color: '#1E90FF',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

const Login = () => {
  const [signIn, result] = useSignIn();
  const [failureError, setFailureError] = useState('');
  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
      setFailureError(e);
    }
  };

  return <SignIn onSubmit={onSubmit} failureError={failureError}/>;
};

export default Login;
