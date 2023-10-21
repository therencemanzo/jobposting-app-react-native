
import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createJob } from "../slices/jobs";
import { useCreateJobMutation,useGetJobsQuery } from '../store-backup/apiSlice';
import { useNavigation } from '@react-navigation/native';

const AddJobScreen = ({ route }) => {

    //const [createJob, { data, error, isLoading }] = useCreateJobMutation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('');
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleAdd = async () => {
        dispatch(useGetJobsQuery());
        const result = await createJob({
            title : title,
            description : description,
            salary : salary,
            company : company,
            category : category
        });

        // if (result) {
          
            
        //     navigation.navigate('Jobs');
        //     useGetJobsQuery;
        //   //refresh main screen,
        //   //reset
        // }
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }

  
    return (
        <View styles={{ flex: 1 }}>
            <View styles>
                <View style={styles.jobDetailsContainer}>
                    {error ? <View><Text style={styles.errorMessage}>{ error.data.message }</Text></View> : null}
                    <View>
                        <Text style={styles.label}>Title</Text>
                        <TextInput style={styles.textInput} 
                            onChangeText={(value)=> setTitle(value)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Description</Text>
                        <TextInput style={styles.textInput} 
                            onChangeText={(value)=> setDescription(value)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Salary</Text>
                        <TextInput style={styles.textInput} 
                            onChangeText={(value)=> setSalary(value)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Company</Text>
                        <TextInput style={styles.textInput} 
                            onChangeText={(value)=> setCompany(value)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Category</Text>
                        <TextInput style={styles.textInput} 
                            onChangeText={(value)=> setCategory(value)}
                        />
                    </View>
                </View>
            </View>

            <View>
                <Pressable onPress={() => handleAdd()} style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red'
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
    label:{
        fontWeight: '400',
        fontSize:16,
        paddingVertical:10
    },
    textInput :{
        padding:10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10
    }
});

export default AddJobScreen;