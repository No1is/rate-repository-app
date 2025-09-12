import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        alignItems: 'flex-start',
    },
    ratingColumn: {
        alignItems: 'flex-start',
        marginRight: 10,
        width: 54,
    },
    circle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderColor: theme.colors.primary,
        borderWidth: 3,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleText: {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.primary,
        fontSize: theme.fontSizes.subheading
    },
    textColumn: {
        flexDirection: 'column',
        flex: 1,
    },
    name: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading,
        marginBottom: 4,
    },
    date: {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    review: {
        fontSize: theme.fontSizes.body,
    },
});

const ReviewItem = ({ item }) => {
    const date = format(new Date(item.createdAt), 'dd.MM.yyyy')
    
    return (
        <View style={styles.container}>
            <View style={styles.ratingColumn}>
                <View style={styles.circle}>
                    <Text style={styles.circleText}>{item.rating}</Text>
                </View>
            </View>
            <View style={styles.textColumn}>
                <Text style={styles.name}>{item.user ? (item.user.username) : (item.repository.fullName)}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.review}>{item.text}</Text>
            </View>
        </View>
    );
};

export default ReviewItem