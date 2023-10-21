import {
    StyleSheet,
    View,
    useWindowDimensions,
    Text,
    Pressable,
    ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useGetJobQuery } from '../store-backup/apiSlice';

const JobDetailsScreen = ({ route }) => {
    const id = route.params.id;

    const { data, isLoading, error } = useGetJobQuery(id);
    const job = data?.data;

    const dispatch = useDispatch();

    const { width } = useWindowDimensions();

    // const addToCart = () => {
    //   dispatch(cartSlice.actions.addCartItem({ product }));
    // };

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error fetching the product. {error.error}</Text>;
    }

    return (
        <View styles={{ flex: 1 }}>
            <View styles>
                <View style={styles.jobDetailsContainer}>
                    <Text style={styles.title}>{job.title}</Text>
                    <Text style={styles.price}>£{job.salary} yearly salary</Text>
                    <Text style={styles.description}>{job.description}</Text>
                    <Text styles={styles.label}>Company</Text>
                    <Text style={styles.description}>{job.company}</Text>
                    <Text styles={styles.label}>Category</Text>
                    <Text style={styles.description}>{job.category}</Text>
                </View>
            </View>

            <View>
                <Pressable onPress={() => console.log('edit')} style={styles.button}>
                    <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginVertical: 10,
    },
    price: {
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: 1.5,
    },
    description: {
        marginVertical: 10,
        fontSize: 18,
        lineHeight: 30,
        fontWeight: '300',
    },

    button: {
        backgroundColor: 'black',
        width: '60%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
    },
    jobDetailsContainer: { 
        padding: 20, 
        height: 650
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    label :{
        paddingVertical: 20,
        fontSize:20,
        fontWeight: '400',
    }
});

export default JobDetailsScreen;