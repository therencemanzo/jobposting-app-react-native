import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import JobsList from './components/JobList';
import AddJob from './components/AddJob';
import JobDetails from './components/JobDetails';
import EditJob from './components/EditJob';

import { Pressable, Text } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

;

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = 10;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
      >
        
        <Stack.Screen
          name='Jobs'
          component={JobsList}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('Post A Job')}
                style={{ flexDirection: 'row' }}
              >
                <MaterialCommunityIcons name="clipboard-plus-outline" size={18} color="gray" />
                <Text style={{ marginLeft: 5, fontWeight: '500' }}>
                  Post a job
                </Text>
              </Pressable>
            )

          })}
        />
        <Stack.Screen
          name="Post A Job"
          component={AddJob}
          options={{ presentation: 'modal' }}
        />
        
        <Stack.Screen
          name="Job Details"
          component={JobDetails}
          options={{ presentation: 'modal' }}
        />

        <Stack.Screen
          name="Edit Details"
          component={EditJob}
          options={{ presentation: 'modal' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;