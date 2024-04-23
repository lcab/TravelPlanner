import React, { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

// All the screens
import HomeScreen from './screens/HomeScreen';
import StoredItineraryScreen from './screens/StoredItineraryScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import SettingStack from './SettingsStack/SettingsStack';
import LoginScreen from './screens/LoginScreen';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyDnVWNMf3j0wrjiF1jyFG57OWeP_--KYD8",
  authDomain: "travel-planner-38453.firebaseapp.com",
  databaseURL: "https://travel-planner-38453-default-rtdb.firebaseio.com",
  projectId: "travel-planner-38453",
  storageBucket: "travel-planner-38453.appspot.com",
  messagingSenderId: "585978496389",
  appId: "1:585978496389:web:86448e4357f4707ade70ec",
  measurementId: "G-9X6CE1NVPL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const UserProfile = ({ navigation , user}) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30}}>
    {user ? ( 
      <>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>{user.email}</Text> 
        </TouchableOpacity>
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }}
        />
      </>
    ) : (
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={{ textDecorationLine: 'underline' }}>Log In</Text>
    </TouchableOpacity>
  )}
  </View>
);

const App = () => {
  const [user, setUser] = useState(null);
    
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

  return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
        }} 
      >
        <Stack.Screen
          name=" "
          component={BottomTabs}
          options={({ navigation }) => ({
            headerRight: () => <UserProfile navigation={navigation} user={user} />,
          }   
          )}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'StoredItineraryScreen') {
            iconName = 'heart-circle-outline';
          } else if (route.name === 'Itinerary') {
            iconName = 'add-circle-outline';
          } else if (route.name === 'Setting') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#f7934c",
        tabBarInactiveTintColor: "#1f1300",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Itinerary" component={ItineraryScreen} />
      <Tab.Screen name="StoredItineraryScreen" component={StoredItineraryScreen} />
      <Tab.Screen name="Setting" component={SettingStack} />
    </Tab.Navigator>
  );
};
export default App;