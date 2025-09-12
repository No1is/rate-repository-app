import { View, TextInput, Pressable, Text } from 'react-native';
import { useFormik } from 'formik';

const initialValues = {
    username: '',
    password: '',
};

export const SignInContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    const handleSubmit = () => {
        const { username, password } = formik.values
        onSubmit({ username, password })
    }

    return (
        <View>
            <TextInput
              placeholder="Username"
              placeholderTextColor='#ced4da'
              value={formik.values.username}
              onChangeText={formik.handleChange('username')}
            />
            <TextInput
              secureTextEntry
              placeholder='Password'
              placeholderTextColor='#ced4da'
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
            />
            <Pressable onPress={handleSubmit}>
                <Text>Sign In</Text>
            </Pressable>
        </View>
    )
};