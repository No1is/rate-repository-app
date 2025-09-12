import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'
import RepositorView from './RepositoryView'
import ReviewForm from './ReviewForm'
import SignUpForm from './SignUpForm'
import theme from '../theme'
import ReviewList from './ReviewList'

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.backgroundColor.main
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/:id" element={<RepositorView />} />
                <Route path='/add-review' element={<ReviewForm />} />
                <Route path='/my-reviews' element={<ReviewList />} />
                <Route path='/sign-up' element={<SignUpForm />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
};

export default Main;