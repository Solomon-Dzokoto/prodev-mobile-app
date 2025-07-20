import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    searchGroup: {
        backgroundColor: 'white',
        height: 145,
        padding: 20,
        justifyContent: 'center'
    },
    searchFormGroup: {
        backgroundColor: '#F9F9F9',
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    searchControlGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    searchFormText: {
        fontSize: 16,
        fontWeight: '400'
    },
    searchControl: {
        width: 200
    },
    searchButton: {
        backgroundColor: '#34967C',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        paddingHorizontal: 20
    },
    filterContainer: {
        alignItems: 'center',
        rowGap: 5
    },
    listingContainer: {
        padding: 20
    },
    paginationContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40
    },
    showMoreButton: {
        backgroundColor: '#34967C',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    showMoreButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
});

export { styles };
