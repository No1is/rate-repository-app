import { StyleSheet, Pressable, View } from "react-native";
import Text from './Text';
import { Link } from '../../router/RouterProvider';
import theme from "../theme";

const styles = StyleSheet.create({
    tab: {
        color: 'white',
        padding: 15,
        fontWeight: theme.fontWeights.bold
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
})
const AppBarTab = ({ tab, onPress }) => {
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
                return '/'
        }
    }
    if (onPress) {
        return (
            <View style={styles.tabContainer}>
                <Pressable onPress={onPress}>
                    <Text style={styles.tab}>{tab}</Text>
                </Pressable>
            </View>
        );
    }
    return (
        <View style={styles.tabContainer}>
            <Link to={link(tab)}>
                <Text style={styles.tab}>{tab}</Text>
            </Link>
        </View>
    );
};

export default AppBarTab;