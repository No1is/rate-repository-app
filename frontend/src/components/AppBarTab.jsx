import { StyleSheet } from "react-native";
import Text from './Text';
import { Link } from '../../router/RouterProvider';
import theme from "../theme";

const styles = StyleSheet.create({
    tab: {
        color: 'white',
        padding: 15,
        fontWeight: theme.fontWeights.bold
    }
})
const AppBarTab = ({ tab }) => {
    const link = (tab) => {
        switch (tab) {
            case 'Repositories':
                return '/';
            case 'Sign In':
                return '/sign-in';
            case 'Create a review':
                return '/add-review';
            case 'Sign Up':
                return '/sign-up';
            case 'My Reviews':
                return '/my-reviews';
            default:
                return null
        }
    }
    return (
        <Link to={link(tab)}>
            <Text style={styles.tab}>
                {tab}
            </Text>
        </Link>
    );
};

export default AppBarTab;