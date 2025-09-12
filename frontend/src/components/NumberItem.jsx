import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    number: {
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textPrimary,
        textAlign: 'center'
    },
    caption: {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textSecondary,
        textAlign: 'center'
    }
})
const NumberItem= ({ value, caption }) => {

    const kCount = (num) => {
        if (num < 1000) return num.toString();
        const value = num / 1000;
        return `${value.toFixed(1).replace(/\.0$/, '')}k`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.number}>{kCount(value)}</Text>
            <Text style={styles.caption}>{caption}</Text>
        </View>
    )
}

export default NumberItem