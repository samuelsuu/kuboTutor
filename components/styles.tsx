import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 16,
    },
    card: {
        width: '30%',
        backgroundColor: '#D8E5EC',
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 16,
        padding: 35,
        elevation: 2,
    },
    image: {
        width: 40,
        height: 40,
        marginBottom: 8,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
})

export default styles