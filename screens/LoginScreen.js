import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut , updateProfile} from '@firebase/auth';
import { getStorage, ref, uploadBytes } from '@firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import userImage from '../user.png';
import { screenStyles } from '../styles';

const AuthScreen = ({ email, setEmail, password, setPassword, firstName, setFirstName, lastName, setLastName, photo, setPhoto, isLogin, setIsLogin, handleAuthentication }) => {
  const getImage = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access media library was denied');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.cancelled) {
      // Update selected image URI
      setPhoto(result.assets[0].uri);
    }
    
  };

  return (
    <View style={styles.authContainer}>
       <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>

       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          {photo ? (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo}/>
              <Button title="Change Profile Picture" onPress={getImage} />
            </View>
            
          ) : (
            <Button title="Choose A Profile Picture (Click Here)" onPress={getImage} />
          )}
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}


const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};

const LoginScreen = ({ app }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photo, setPhoto] = useState(null);
    const [user, setUser] = useState(null); 
    const [isLogin, setIsLogin] = useState(true);
  
    const auth = getAuth(app);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, [auth]);
  
    
    const handleAuthentication = async () => {
      try {
        if (user) {
          // If user is already authenticated, log out
          console.log('User logged out successfully!');
          await signOut(auth);
        } else {
          // Sign in or sign up
          if (isLogin) {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
          } else {
            // Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully!');

            console.log("IDKKKKKK");
            console.log(user);

            const displayName = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`.trim() || ' ';
            console.log(displayName);
            const profileData = {
              displayName: displayName 
            };
            console.log(profileData);

            if (photo) {
              profileData.photoURL = photo;
            }else{
              profileData.photoURL = 'https://firebasestorage.googleapis.com/v0/b/travel-planner-38453.appspot.com/o/user.png?alt=media&token=81b20ef4-85e5-4bcc-8633-2bf818945661';
            }

            await updateProfile(auth.currentUser, profileData);
          }
        }
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {user ? (
          // Show user's email if user is authenticated
          <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
        ) : (
          // Show sign-in or sign-up form if user is not authenticated
          <AuthScreen
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            photo ={photo}
            setPhoto = {setPhoto}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleAuthentication={handleAuthentication}
          />
        )}
      </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    authContainer: {
      width: '80%',
      maxWidth: 400,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      borderRadius: 4,
    },
    buttonContainer: {
      marginBottom: 16,
    },
    toggleText: {
      color: '#3498db',
      textAlign: 'center',
    },
    bottomContainer: {
      marginTop: 20,
    },
    emailText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
    photoContainer: {
      alignItems: 'center',
      marginTop: 20,
    },
    photo: {
      width: 200, 
      height: 200, 
      borderRadius: 100, 
      marginBottom: 10,
    },
  });
export default LoginScreen;