import { StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from './theme';
import useSignIn from '../hooks/useSignIn'

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'At least a 3 letter username is expected')
      .required('Username is required'),
    password: yup
      .string()
      .min(1, 'cannot set a black password')
      .required('Password is required'),
  });

const SignIn = ({ onSubmit }) => {
  
  let hasError=false;
  const formStyle = StyleSheet.create({
    feederField:{
      borderWidth:1,
      borderStyle:'solid',
      borderColor: hasError ? '#d73a4a' : 'grey',
      padding:10,
      margin:5,
      height:40,
      borderRadius:4,
      color:'grey'
    }
  })

  const buttonStyle = {
    ...formStyle.feederField,
    backgroundColor:theme.colors.fillPrimary,
    flex:0,
    flexDirection:'row',
    justifyContent:'center'
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={{backgroundColor:theme.colors.fillVanilla}}>
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
  );
};

const Login = () => {
  const [signIn, result] = useSignIn();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log('received', data);
    } catch (e) {
      console.log(e);
    }

  };

  return <SignIn onSubmit={onSubmit} />;
};

export default Login;