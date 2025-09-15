import { useParams } from '../../router/RouterProvider';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';
import { Linking } from 'react-native';
import { Pressable, View, StyleSheet, FlatList } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    itemContainer: {
        padding: 15,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {

    const handlePress = () => {
        Linking.openURL(repository.url)
    };

    return (
        <View style={styles.itemContainer}>
            <RepositoryItem item={repository} />
            <Pressable style={styles.button} onPress={handlePress}>
                <Text style={{ color: 'white' }}>Open in GitHub</Text>
            </Pressable>
        </View>
    );
};

const RepositoryView = () => {
    const { id } = useParams();
    const { repository, loading, error, fetchMore } = useRepository({
        id: id,
        first: 3,
    });

    if (loading) return <Text>data is loading</Text>
    if (error) return <Text>error loading data</Text>
    if (!repository) return <Text>data not ready</Text>

    const reviews = repository.reviews.edges.map(e => e.node)

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            style={styles.container}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item } ) => (
                    <ReviewItem item={item} />
                )}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
            ListHeaderComponentStyle={{ marginBottom: 10 }}
        />
    );
};

export default RepositoryView;