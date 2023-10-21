import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobDetails from './JobDetails';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {
  retrieveJobs,
  retrieveJob
} from "../slices/jobs";


const JobsList = () => {


  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isError = useSelector(state => state.jobs.isError);
  const reload = useSelector(state => state.jobs.reload);

  const [jobs, setJobs] = useState([]);
  const [fetch, setFetch] = useState(1);
  const [paginate, setPaginate] = useState(false);
  const [page, setPage] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);
  const [startPage, setStartPage] = useState(0);

  useEffect(() => {

    dispatch(retrieveJobs(page)).then((res) => {

        
        setJobs([...jobs, ...res.payload.data]);

        if (res.payload.links.next === null) {
          setPaginate(false);
        } else {
          setPaginate(true);
        }

        if (jobs.length >= 20) {
          setPaginate(false);
          setShowNextButton(true);
        }
      

    });

  }, [fetch, page]);
  //console.log(jobs);
  useEffect(() => {
    if (reload > 1) {
      setPaginate(false);
      setJobs([]);
      setPage(1);
      setFetch(fetch + 1);
    }
  }, [reload]);

  const loadMoreItem = () => {
    if (paginate) {
      setPage(page + 1);
      setStartPage(startPage + 1);
    }
  }


  function renderLoader() {

    if (paginate)
      return (<View style={{ paddingVertical: 30, alignItems: 'center' }} ><ActivityIndicator color={'#ccc'} /><Text>Loading more jobs...</Text></View>);

    if (!paginate)
      return (<View style={{ paddingVertical: 30, alignItems: 'center' }} ><Text>No more jobs..</Text></View>);

  }

  if (isError) {
    return <Text>Error fetching jobs.</Text>;

  }


  return (
    <FlatList
      data={jobs}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            // update selected product
            dispatch(retrieveJob(item.id))
            // dispatch(productsSlice.actions.setSelectedProduct(item.id));
            navigation.navigate('Job Details', { id: item.id });
          }}
          style={styles.itemContainer}
        >
          <View style={styles.jobContainer}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobDescription} >{item.description}</Text>
            <Text style={styles.jobSalary}>£{item.salary} Yearly</Text>
          </View>
        </Pressable>
      )}

      keyExtractor={(item) => item.id}
      onEndReached={loadMoreItem}
      ListFooterComponent={renderLoader}
    />
  );
};

const styles = StyleSheet.create({
  
  itemContainer: {
    width: '100%',
    padding: 1,

  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  jobContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobDescription: {
    fontSize: 12,
    color: '#61605d',
    padding: 10
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});


export default JobsList;