import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView, ImageBackground  } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut , updateProfile} from '@firebase/auth';
//import { getStorage, ref, uploadBytes } from '@firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const AuthScreen = ({ email, setEmail, password, setPassword, firstName, setFirstName, lastName, setLastName, photo, setPhoto, isLogin, setIsLogin, handleAuthentication }) => {

  const getProfilePic = async () => {

    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permission denied: No access to media');
    };

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    };
  };

  return (
    <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/travel-planner-38453.appspot.com/o/LoginBackground.jpg?alt=media&token=a58dbe22-f4cb-4cf6-b506-3ceba720a996' }} style={styles.backgroundContainer}>
      <View style={styles.titleContainer} >
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="darkorange" 
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="darkorange" 
          secureTextEntry
        />

        {!isLogin && (
          <>
            <TextInput
              style={styles.inputBox}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              placeholderTextColor="darkorange" 
            />
            <TextInput
              style={styles.inputBox}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              placeholderTextColor="darkorange" 
            />
            {photo ? (
              <View style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photo}/>
                <Button title="Change Profile Picture" onPress={getProfilePic} style={styles.photoContainer}/>
              </View>
              
            ) : (
              <Button title="Choose A Profile Picture (Click Here)" onPress={getProfilePic}/>
            )}
          </>
        )}
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="white" />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}


const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={{ backgroundColor: 'orange' , width: '90%'}}>
      <Text style={[styles.title, { paddingBottom: 30 }]}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="yellow" />
    </View>
  );
};

const LoginScreen = ({ app }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        await signOut(auth);
      } else {
        if (!/\S+@\S+\.\S+/.test(email)) {
          alert("Please enter a valid email address.");
          return;
        } 

        if (!email || !password) {
          alert("Please enter email and password.");
          return;
        }

        if (password.length < 6) {
          alert("Password must be at least 6 characters long.");
          return;
        }

        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          await createUserWithEmailAndPassword(auth, email, password);

          const displayName = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`.trim() || ' ';

          const profileData = {
            displayName: displayName 
          };

          //If user pics picture eset as picture and if not use default picture
          if (photo) {
            profileData.photoURL = photo;
          }else{
            profileData.photoURL = 'https://firebasestorage.googleapis.com/v0/b/travel-planner-38453.appspot.com/o/user.png?alt=media&token=81b20ef4-85e5-4bcc-8633-2bf818945661';
          }

          //update profile information
          await updateProfile(auth.currentUser, profileData);
        }
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("The email address is already in use.");
      } else {
        throw error;
      }
    }
  };
  
  return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {user ? (
            
          <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
        ) : (
            
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
  backgroundContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',    
    width : '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formConatiner: {
    width: '80%',
    maxWidth: 200,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },  
  formContainer : {
    width: '80%',
    maxWidth: 150,
    padding: 16,
    borderRadius: 8,
    paddingBottom: 20,
    paddingTop: 300,
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    paddingBottom: 400,
    paddingTop: 20,
  },
  inputBox: {
    height: 60,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: 16,
    padding: 8,
    paddingTop: 20,
    backgroundColor: 'white',
  },
    buttonContainer: {
      marginTop: 30,
      marginBottom: 16,
      borderRadius: 8,
      borderColor: 'darkorange',
      backgroundColor: 'darkorange',
      borderWidth: 8,
      borderRadius: 30,
    },
    toggleText: {
      color: 'white',
      textAlign: 'center',
      textDecorationLine: 'underline',
      fontSize: 20,
    },
    bottomContainer: {
      fontSize: 30,
    },
    emailText: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      marginBottom: 20,
    },
    photoContainer: {
      alignItems: 'center',
      marginTop: 20
    },
    photo: {
      width: 100, 
      height: 100, 
      borderRadius: 100, 
      marginBottom: 10,
    },
  });
export default LoginScreen;