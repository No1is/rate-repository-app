import { View, Image, StyleSheet } from "react-native";
import Text from './Text'
import theme from '../theme'
import NumberItem from './NumberItem'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        padding: 15,
    },
    topRow: {
        flexDirection: 'row',
        marginRight: 16,
    },
    avatarBox: {
        alignSelf: 'flex-start',
        marginRight: 16,
    },
    textBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    },
    statBlock: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 8,
    },
    tag: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginTop: 8,
        marginBottom: 16,
    },
    name: {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textPrimary
    },
    description: {
        color: theme.colors.textSecondary,
        marginVertical: 5,
    },
})

const RepositoryItem = ({ item }) => {

    const stats = [
        { value: item.stargazersCount, caption: 'Stars'},
        { value: item.forksCount, caption: 'Forks' },
        { value: item.reviewCount, caption: 'Reviews' },
        { value: item.ratingAverage, caption: 'Rating' },
    ]

    return (
        <View testID="repositoryItem" style={styles.container}>
            <View>
                <View style={styles.topRow}>
                    <View style={styles.avatarBox}>
                        <Image
                            source={{ uri: item.ownerAvatarUrl }}
                            resizeMode="cover"
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={styles.name}>{item.fullName}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.tag}>
                            <Text style={{ color: 'white' }}>{item.language}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.statBlock}>
                    {stats.map((stat, index) => (
                        <NumberItem key={index} value={stat.value} caption={stat.caption} />
                    ))}
                </View>
            </View>
        </View>
    )
};

export default RepositoryItem