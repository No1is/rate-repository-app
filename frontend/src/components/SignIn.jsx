import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from '../../router/RouterProvider';
import { useApolloClient } from '@apollo/client';

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        padding: 15,
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: theme.fontSizes.subheading,
        backgroundColor: 'white',
    },
    inputError: {
        borderColor: '#d73a4a'
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        marginBottom: 16,
        alignItems: 'center',
    },
});

const initialValues = {
    username: '',
    password: '',
};

const SignIn = () => {
    const [signIn, authStorage] = useSignIn();
    const apolloClient = useApolloClient()
    const navigate = useNavigate()
    
    const onSubmit = async (values, { resetForm }) => {
        const { username, password } = values;
        
        try {
            const { data } = await signIn({ username,password });
            await authStorage.setAccessToken(data.authenticate.accessToken)
            apolloClient.resetStore();
            navigate('/')
        } catch (error) {
            console.log(error);
        }
        resetForm()
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
              style={[styles.input,
                formik.touched.username && formik.errors.username && styles.inputError,
              ]}
              placeholder="Username"
              placeholderTextColor='#ced4da'
              value={formik.values.username}
              onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
            )}
            <TextInput
              style={[styles.input,
                formik.touched.password && formik.errors.password && styles.inputError,
              ]}
              secureTextEntry
              placeholder='Password'
              placeholderTextColor='#ced4da'
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={{ color: 'white' }}>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default SignIn