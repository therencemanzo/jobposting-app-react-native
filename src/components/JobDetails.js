
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveJob,deleteJob } from "../slices/jobs";
import { useNavigation } from '@react-navigation/native';

const JobDetails = (data) => {

    //const id = data.route.params.id;
    //const [createJob, { data, error, isLoading }] = useCreateJobMutation();

    const [success, setSuccess] = useState(false);

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const job = useSelector(state => state.jobs.data);
    const loading = useSelector(state => state.jobs.isLoading);

    const handleDelete = (id) => {
   
        dispatch(deleteJob(id)).then((res)=>{
           
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigation.navigate('Jobs');
            }, 1000);
        });
        
    }

    return (
        <View styles={{ flex: 1 }}>
            <View styles>
                <View style={styles.jobDetailsContainer}>
                    {success ? <View style={styles.successMessage}><Text style={{ color: '#fff' }}>Succesfully deleted a job.</Text></View> : null}
                    {loading ? <View style={styles.loadingMessage}><ActivityIndicator color={'#fff'}></ActivityIndicator><Text>Processing...</Text></View> : null}
                    <View>
                        <Text style={styles.label}>Title</Text>
                        <Text style={styles.content}>{job.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Description</Text>
                        <Text style={styles.content}>{job.description}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Salary</Text>
                        <Text style={styles.content}>{job.salary}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Company</Text>
                        <Text style={styles.content}>{job.company}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Category</Text>
                        <Text style={styles.content}>{job.category}</Text>
                    </View>
                </View>
            </View>
            {
                !loading ? <View style={{ paddingVertical: 30, justifyContent: "space-around", flexDirection: 'row', textAlign: 'center' }} >
                    <Pressable onPress={() => navigation.navigate('Edit Details') } style={styles.buttonNavEdit}>
                        <Text style={styles.buttonText}>Edit </Text>
                    </Pressable>

                    <Pressable onPress={() => handleDelete(job.id)} style={styles.buttonNavDelete}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </Pressable>
                </View> : null
            }

        </View>
    );
};

const styles = StyleSheet.create({
    successMessage: {
        alignItems: 'center',
        backgroundColor: '#2c630e',
        padding: 20,
        borderRadius: 5
    },
    loadingMessage: {
        alignItems: 'center',
        backgroundColor: '#274161',
        padding: 20,
        borderRadius: 5
    },
    button: {
        backgroundColor: 'black',
        width: '60%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
    },

    buttonNavEdit: {
        flex: 2,
        backgroundColor: '#174d80',
        width: '20%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        margin: 10,
        alignItems: 'center',
    },
    buttonNavDelete: {
        flex: 2,
        backgroundColor: '#823316',
        width: '20%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        margin: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: '300',
        fontSize: 14,
    },
    jobDetailsContainer: {
        padding: 20,
        height: 550
    },
    label: {
        fontWeight: '200',
        fontSize: 16,
        paddingVertical: 10
    },
    content: {
        fontWeight: '400',
        fontSize: 18,
        paddingVertical: 10
    },

});

export default JobDetails;