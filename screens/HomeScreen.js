import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text,TouchableOpacity, FlatList,TextInput,Button, Image } from 'react-native';

const HomeScreen = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [photos, setPhotos] = useState([]);

    const userSearches = () => {

        const results = locations.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResults(results);
        fetchPhotos();
    };

    //Use Api
    const fetchPhotos = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&per_page=1&client_id=KcFupZlqSBB_5vl-Xdo-O63VJZnnDMtoqJAdPHqZ9JM`);
            const data = await response.json();
            setPhotos(data.results.map(photo => photo.urls.regular));
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };


    return (
        <View style={styles.container}>

        <View style={styles.search}>
            <TextInput
            style={styles.textInput}
            onChangeText={text => setSearch(text)}
            value={search}
            placeholder="Search For A US State..."
            multiline={true}
            numberOfLines={3}
            />
            <TouchableOpacity style={styles.searchButton} onPress={userSearches}>
            <Text style={{color: 'white',
        fontWeight: 'bold'}}>Search</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            contentContainerStyle={styles.stateHeaderContainer}    
            data={searchResults}
            renderItem={({ item }) => 
            <Text style={styles.stateHeader}> {item.name} ({item.abbreviation})</Text>}
            keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.photosContainer}>
            {photos.map((photo, index) => (
            <Image
                key={index}
                source={{ uri: photo }}
                style={styles.photo}
            />
            ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    nav: {
        padding: 20,
    },
    photosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        flexGrow: 1, 
    },
    photo: {
        width: 150,
        height: 150,
        margin: 5,
    },  
    search: {
        width: 400,
        flexDirection: 'row',
        marginLeft: 10,
    },
    textInput: {
        flex: 1,
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    searchButton: {
        backgroundColor: 'orange',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },  
    stateHeader: {
        fontSize: 20, 
        fontWeight: 'bold', 
        textDecorationLine: 'underline',
        flexGrow: 1,
        marginTop: 10,
    },
    stateHeaderContainer: {
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10, 
    },
  
});

const locations = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
];

export default HomeScreen;