import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import {
  retrieveJobs
} from "../slices/jobs";


const JobsList = () => {


  const dispatch = useDispatch();

  const isError = useSelector(state => state.jobs.isError);
  const reload = useSelector(state => state.jobs.reload);

  const [jobs, setJobs] = useState([]);
  const [fetch, setFetch] = useState(1);
  const [paginate, setPaginate] = useState(false);
  const [page, setPage] = useState(1);
  const [showNextButton, setShowNextButton] = useState(false);
  const [startPage, setStartPage] = useState(0);
  console.log(reload + ' =  fetch ' + fetch + ' = page  ' + page, 'chcker');

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

  const handleNext = () => {
    setJobs([]);
    setFetch(fetch + 1);
    //setPaginate(true);
  }

  const HandlePageOne = () => {
    setJobs([]);
    setPage(1);
    setFetch(fetch + 1);
    //setPaginate(true);
  }

  function renderLoader() {

    if (paginate)
      return (<View style={{ paddingVertical: 30, alignItems: 'center' }} ><ActivityIndicator color={'#ccc'} /><Text>Loading more jobs...</Text></View>);

    if (!paginate && !showNextButton)
      return (<View style={{ paddingVertical: 30, alignItems: 'center' }} ><Text>No more jobs..</Text></View>);

    if (showNextButton && page == 3)
      return (<View style={{ paddingVertical: 30, alignItems: 'center' }} ><Pressable onPress={() => handleNext()} style={styles.button}>
        <Text style={styles.buttonText}>Next Page</Text>
      </Pressable>
      </View>);

    if (showNextButton && page > 3)
      return (<View style={{ paddingVertical: 30, justifyContent: "space-around", flexDirection: 'row', textAlign:'center' }} >
        <Pressable onPress={() => HandlePageOne()} style={styles.buttonNav}>
          <Text style={styles.buttonText}>First Page</Text>
        </Pressable>

        <Pressable onPress={() => handleNext()} style={styles.buttonNav}>
          <Text style={styles.buttonText}>Next Page</Text>
        </Pressable>
      </View>);
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
  button: {
    backgroundColor: 'black',
    width: '60%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },

  buttonNav: {
    flex: 2,
    backgroundColor: 'black',
    width: '20%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    margin: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
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