
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateJob  } from "../slices/jobs";
import { useNavigation } from '@react-navigation/native';

const EditJob = () => {


  const job = useSelector(state => state.jobs.data);
  
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [salary, setSalary] = useState(job.salary);
  const [company, setCompany] = useState(job.company);
  const [category, setCategory] = useState(job.category);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  
  const loading = useSelector(state => state.jobs.isLoading);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleUpdate = async (id) => {
    
    setError(false);
    setSuccess(false);

    dispatch(updateJob({
      id:id,
      title: title,
      description: description,
      salary: salary,
      company: company,
      category: category
    })).then((res) => {

      if (res.payload.errors) {

        setErrorMessage(res.payload.message);
        setError(true);

      } else {

        setSuccess(true);

        setTimeout(() => {
          navigation.navigate('Jobs');
        }, 2000);
      }

    });

    // if (result) {


    //     navigation.navigate('Jobs');
    //     useGetJobsQuery;
    //   //refresh main screen,
    //   //reset
    // }
  }


  return (
    <View styles={{ flex: 1 }}>
      <View styles>
        <View style={styles.jobDetailsContainer}>
          {success ? <View style={styles.successMessage}><Text style={{ color: '#fff' }}>Succesfully updated the job.</Text></View> : null}
          {loading ? <View style={styles.loadingMessage}><ActivityIndicator color={'#fff'}></ActivityIndicator></View> : null}
          {error ? <View style={styles.errorMessage}><Text style={{ color: '#fff' }}>{errorMessage}</Text></View> : null}
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.textInput}
              onChangeText={(value) => setTitle(value)}
              value={title}
            />
          </View>
          <View>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.textInput}
              onChangeText={(value) => setDescription(value)}
              value={description}
            />
          </View>
          <View>
            <Text style={styles.label}>Salary</Text>
            <TextInput style={styles.textInput} keyboardType='number-pad'
              onChangeText={(value) => setSalary(value)}
              value={salary.toString()}
            />
          </View>
          <View>
            <Text style={styles.label}>Company</Text>
            <TextInput style={styles.textInput}
              onChangeText={(value) => setCompany(value)}
              value={company}
            />
          </View>
          <View>
            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.textInput}
              onChangeText={(value) => setCategory(value)}
              value={category}
            />
          </View>
        </View>
        {!loading ?
          <View>
            <Pressable onPress={() => handleUpdate(job.id)} style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </View> : null}
      </View>

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
  errorMessage: {
    alignItems: 'center',
    backgroundColor: 'red',
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
  jobDetailsContainer: {
    padding: 20,
    height: 550
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    paddingVertical: 10
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10
  }
});

export default EditJob;