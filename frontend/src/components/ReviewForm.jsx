import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from '../../router/RouterProvider';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useReview from '../hooks/useReview';

const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .min(0, 'Rating must be at least 0')
      .max(100, 'Rating cannot exceed 100')
      .integer('Rating must be a whole number')
      .required('Rating is required (0-100)'),
    text: yup
      .string()
      .nullable()
      .optional()
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
        font: theme.fontSizes.subheading,
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
    repositoryName: '',
    ownerName: '',
    rating: '',
    text: null,
}

const ReviewForm = () => {
    const [create] = useReview()
    const navigate = useNavigate()

    const onSubmit = async (values, { resetForm }) => {
        const { 
            repositoryName,
            ownerName,
            rating,
            text
        } = values;

        try {
            const { data } = await create({ 
                repositoryName,
                ownerName,
                rating,
                text,
            });
            console.log(data)
            navigate('/');
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
                formik.touched.repositoryName && formik.errors.repositoryName && styles.inputError,
              ]}
              placeholder='Repository Name'
              placeholderTextColor='#ced4da'
              value={formik.values.repositoryName}
              onChangeText={formik.handleChange('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
            )}
            <TextInput
              style={[styles.input,
                formik.touched.ownerName && formik.errors.ownerName && styles.inputError,
              ]}
              placeholder='Owner Name'
              placeholderTextColor='#ced4da'
              value={formik.values.ownerName}
              onChangeText={formik.handleChange('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
            )}
            <TextInput
            keyboardType='numeric'
              style={[styles.input,
                formik.touched.rating && formik.errors.rating && styles.inputError,
              ]}
              placeholder='Rating between 0 and 100'
              placeholderTextColor='#ced4da'
              value={formik.values.rating}
              onChangeText={(value) => {formik.setFieldValue('rating', value === '' ? '' : Number(value))}}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
            )}
            <TextInput
              multiline
              style={[styles.input,
                formik.touched.text && formik.errors.text && styles.inputError,
              ]}
              placeholder='Text'
              placeholderTextColor='#ced4da'
              value={formik.values.text != null ? String(formik.values.text) : ''}
              onChangeText={formik.handleChange('text')}
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={{ color: 'red' }}>{formik.errors.text}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={{ color: 'white' }}>Add Review</Text>
            </Pressable>
        </View>
    );
};

export default ReviewForm;
