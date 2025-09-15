import { View, FlatList, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import Text from './Text';
import { USER } from '../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import ReviewItem from './ReviewItem';
import theme from '../theme';
import { useNavigate } from '../../router/RouterProvider';
import { DELETE } from '../graphql/mutations';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    separator: {
        height: 10,
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly'
    },
    viewRepo: {
        backgroundColor: theme.colors.primary,
        marginLeft: 6,
        maxWidth: 250,
    },
    delete: {
        backgroundColor: '#d73a4a',
        marginRight: 6,
        maxWidth: 250,
    },
    button: {
        flex: 1,
        marginHorizontal: 6,
        paddingVertical: 12,
        borderRadius: 5,
        marginBottom: 16,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.bold
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewActions = ({ item, refetch }) => {
    const navigate = useNavigate()
    const [DeleteReview] = useMutation(DELETE, {
        onCompleted: () => refetch(),
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            console.log(messages)
        },
    });

    const title = 'Delete review';
    const description = 'Are you sure you want to delete this review?';
    const options = ['CANCEL', 'DELETE']

    const alertWindow = (title, description, options) => {
        if (Platform.OS === 'web') {
            const result = window.confirm([title, description].filter(Boolean).join('\n'))
            if (result) {
                DeleteReview({variables: { id: item.id }})
            }
        } else {
            Alert.alert(title, description, [
                {
                    text: options[0],
                    onPress: () => console.log('delete action cancelled'),
                    style: 'cancel',
                },
                {
                    text: options[1],
                    onPress: () => {
                        DeleteReview({variables: { id: item.id }})
                    },
                }
            ])
        }
    };

    const handleDelete = () => {
        alertWindow(title, description, options)
    };

    const handleView = () => {
        navigate(`/${item.repositoryId}`)
    };
    
    return (
        <View style={styles.actions}>
            <Pressable 
              style={[styles.button, styles.viewRepo]}
              onPress={handleView}
            >
                <Text style={styles.buttonText}>View Repository</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.delete]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete Review</Text>
            </Pressable>
        </View>
    );
};

const ReviewList = () => {
    const { data, loading, error, refetch } = useQuery(USER, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Text>loading reviews...</Text>;
    if (error) return <Text>error loading reviews...</Text>;

    const reviews = data.me?.reviews.edges.map(edge => edge.node);
    
    if (reviews.length === 0) {
        return <Text>No reviews found!</Text>
    }

    return (
        <FlatList
          style={styles.container}
          data={reviews}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <View>
                <ReviewItem item={item} />
                <ReviewActions item={item} refetch={refetch} />
            </View>
          )}
          keyExtractor={({ id }) => id}
        />
    );
};

export default ReviewList;
