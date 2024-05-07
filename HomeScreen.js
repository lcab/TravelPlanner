import React from 'react';
import { StyleSheet, View, Text, Button, Image, ScrollView } from 'react-native';

const locations = [
  {
    title: 'New York',
    image: 'https://source.unsplash.com/random/300x300?new+york',
    places: [
      {
        name: '\nCentral Park\n',
        description: 'A sprawling green oasis in the heart of Manhattan, offering a peaceful escape from the bustling city life.',
        image: 'https://source.unsplash.com/random/300x300?central+park'
      },
      {
        name: '\nTimes Square\n',
        description: 'The iconic commercial and entertainment hub of NYC, known for its vibrant lights, Broadway theaters, and bustling crowds.',
        image: 'https://source.unsplash.com/random/300x300?times+square'
      },
      {
        name: '\nStatue of Liberty\n',
        description: 'A symbol of freedom and democracy, located on Liberty Island in New York Harbor. Visitors can take ferry rides to the island and explore the statue up close.',
        image: 'https://source.unsplash.com/random/300x300?statue+liberty'
      }
    ],
    details: 'Explore the vibrant city of New York and discover its iconic landmarks.'
  },
  {
    title: 'California',
    image: 'https://source.unsplash.com/random/300x300?san+francisco',
    places: [
      {
        name: '\nGolden Gate Bridge\n',
        description: 'An iconic suspension bridge spanning the Golden Gate strait, connecting San Francisco to Marin County. It is one of the most photographed landmarks in the world.',
        image: 'https://source.unsplash.com/random/300x300?golden+gate+bridge'
      },
      {
        name: '\nYosemite National Park\n',
        description: 'A UNESCO World Heritage Site known for its stunning granite cliffs, waterfalls, and diverse ecosystems. Visitors can enjoy hiking, rock climbing, and wildlife watching in the park.',
        image: 'https://source.unsplash.com/random/300x300?yosemite+national+park'
      },
      {
        name: '\nDisneyland\n',
        description: 'A world-famous theme park resort in Anaheim, California, featuring attractions, entertainment, and dining experiences inspired by Disney characters and stories.',
        image: 'https://source.unsplash.com/random/300x300?disney+land'
      }
    ],
    details: 'Experience the beauty of California and visit its famous attractions.'
  },
  {
    title: 'Florida',
    image: 'https://source.unsplash.com/random/300x300?florida',
    places: [
      {
        name: '\nWalt Disney World\n',
        description: 'The world\'s most visited vacation resort, featuring four theme parks, two water parks, and various entertainment and dining options for visitors of all ages.',
        image: 'https://source.unsplash.com/random/300x300?walt+disney+world'
      },
      {
        name: '\nUniversal Studios\n',
        description: 'A renowned film and television production studio that also operates as a theme park, offering immersive attractions and experiences based on popular movies and TV shows.',
        image: 'https://source.unsplash.com/random/300x300?universal+studio'
      },
      {
        name: '\nMiami Beach\n',
        description: 'A vibrant coastal city known for its beautiful beaches, Art Deco architecture, and lively nightlife. Visitors can enjoy sunbathing, water sports, and exploring the vibrant neighborhoods of South Beach and Wynwood.',
        image: 'https://source.unsplash.com/random/300x300?miami+beach'
      }
    ],
    details: 'Discover the excitement and beauty of Florida with its world-famous attractions and stunning beaches.'
  },
  {
    title: 'Texas',
    image: 'https://source.unsplash.com/random/300x300?texas',
    places: [
      {
        name: '\nThe Alamo\n',
        description: 'A historic Spanish mission and fortress compound in San Antonio, Texas, known for its pivotal role in the Texas Revolution. Visitors can explore the site and learn about its rich history through exhibits and guided tours.',
        image: 'https://source.unsplash.com/random/300x300?the+alamo'
      },
      {
        name: '\nSpace Center Houston\n',
        description: 'The official visitor center of NASA\'s Johnson Space Center, where visitors can learn about space exploration, view artifacts from space missions, and even meet astronauts.',
        image: 'https://source.unsplash.com/random/300x300?space+center+houston'
      },
      {
        name: '\nSan Antonio River Walk\n',
        description: 'A picturesque urban waterway in San Antonio, lined with shops, restaurants, and attractions. Visitors can take boat tours, stroll along the riverwalk, and enjoy the vibrant atmosphere of this iconic destination.',
        image: 'https://source.unsplash.com/random/300x300?san+antonio+river+walk'
      }
    ],
    details: 'Experience the diverse culture and history of Texas with its iconic landmarks and attractions.'
  },
  {
    title: 'Colorado',
    image: 'https://source.unsplash.com/random/300x300?colorado',
    places: [
      {
        name: '\nRocky Mountain National Park\n',
        description: 'A breathtaking national park renowned for its towering peaks, alpine lakes, and diverse ecosystems. Visitors can enjoy hiking, wildlife viewing, and scenic drives amidst stunning natural beauty.',
        image: 'https://source.unsplash.com/random/300x300?rocky+mountain+national+park'
      },
      {
        name: '\nGarden of the Gods\n',
        description: 'A unique geological formation featuring towering sandstone rock formations against a backdrop of snow-capped mountains. Visitors can explore hiking trails, rock climb, and marvel at the striking landscape.',
        image: 'https://source.unsplash.com/random/300x300?garden+gods'
      },
      {
        name: '\nMesa Verde National Park\n',
        description: 'Home to ancient Pueblo cliff dwellings and archaeological sites, Mesa Verde National Park offers a fascinating glimpse into the lives of indigenous peoples who inhabited the region over a thousand years ago.',
        image: 'https://source.unsplash.com/random/300x300?mesa+verde+national+park'
      }
    ],
    details: 'Embark on an adventure in Colorado and discover its majestic mountains, vibrant landscapes, and rich cultural heritage.'
  },
  {
    title: 'Washington',
    image: 'https://source.unsplash.com/random/300x300?washington',
    places: [
      {
        name: '\nMount Rainier National Park\n',
        description: 'An iconic national park dominated by the towering Mount Rainier, an active stratovolcano. Visitors can explore alpine meadows, hike scenic trails, and marvel at breathtaking views of glaciers and wildflowers.',
        image: 'https://source.unsplash.com/random/300x300?mount+rainer+national+park'
      },
      {
        name: '\nPike Place Market\n',
        description: 'One of the oldest continuously operated public farmers\' markets in the United States, Pike Place Market is a bustling hub of activity offering fresh produce, artisanal goods, and seafood, as well as restaurants and unique shops.',
        image: 'https://source.unsplash.com/random/300x300?pike+place+market]'
      },
      {
        name: '\nSpace Needle\n\n',
        description: 'An iconic landmark of Seattle, the Space Needle offers panoramic views of the city skyline, Puget Sound, and surrounding mountains from its observation deck. Visitors can also dine at the rotating SkyCity restaurant for a unique dining experience.',
        image: 'https://source.unsplash.com/random/300x300?space+needle'
      }
    ],
    details: 'Explore the natural wonders and urban delights of Washington state, from majestic mountains to vibrant cities.'
  },
  {
    title: 'Arizona',
    image: 'https://source.unsplash.com/random/300x300?arizona',
    places: [
      {
        name: '\nGrand Canyon National Park\n',
        description: 'One of the most iconic natural wonders of the world, the Grand Canyon is a breathtaking geological formation carved by the Colorado River over millions of years. Visitors can explore the canyon rim, hike trails, and marvel at the stunning vistas.',
        image: 'https://source.unsplash.com/random/300x300?grand+canyon+national+park'
      },
      {
        name: '\nSedona\n',
        description: 'Famous for its red rock formations and spiritual energy, Sedona offers stunning landscapes, vibrant art galleries, and a range of outdoor activities such as hiking, mountain biking, and jeep tours amidst the stunning red rock scenery.',
        image: 'https://source.unsplash.com/random/300x300?sedona+arizona'
      },
      {
        name: '\nHorseshoe Bend\n',
        description: 'A dramatic horseshoe-shaped bend in the Colorado River near the town of Page, Horseshoe Bend offers awe-inspiring views of the meandering river and steep canyon walls. Visitors can hike to the overlook for panoramic vistas and stunning photo opportunities.',
        image: 'https://source.unsplash.com/random/300x300?horsehoe+bend+arizona'
      }
    ],
    details: 'Discover the beauty and wonder of Arizona, from the majestic Grand Canyon to the mystical red rocks of Sedona.'
  },
  {
    title: 'Nevada',
    image: 'https://source.unsplash.com/random/300x300?nevada',
    places: [
      {
        name: '\nLas Vegas Strip\n',
        description: 'The iconic Las Vegas Strip is known for its dazzling array of resorts, casinos, and entertainment venues. Visitors can explore themed hotels, enjoy world-class dining, and experience thrilling nightlife and entertainment options.',
        image: 'https://source.unsplash.com/random/300x300?las+vegas+strip'
      },
      {
        name: '\nHoover Dam\n',
        description: 'An engineering marvel and a symbol of human ingenuity, the Hoover Dam stands as a testament to America\'s ability to tame mighty rivers. Visitors can take guided tours to learn about the dam\'s history, construction, and significance.',
        image: 'https://source.unsplash.com/random/300x300?hoover+dam'
      },
      {
        name: '\nRed Rock Canyon National Conservation Area\n',
        description: 'Located just outside of Las Vegas, Red Rock Canyon offers stunning desert landscapes, towering red sandstone formations, and scenic hiking trails. Visitors can enjoy outdoor activities such as hiking, rock climbing, and wildlife viewing amidst the rugged beauty of the Mojave Desert.',
        image: 'https://source.unsplash.com/random/300x300?red+rock+canyon+national+conservation+area'
      }
    ],
    details: 'Experience the excitement and natural beauty of Nevada, from the glitz and glamour of Las Vegas to the rugged landscapes of Red Rock Canyon.'
  },
];

const HomeScreen = ({ navigation }) => {
  const navigateToInfo = (location) => {
    navigation.navigate('LocationInformation', { location, locationId: location.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>
      <Text style={styles.subtitle}>Top 10 States To Visit</Text>
      <ScrollView contentContainerStyle={styles.locationContainer}>
        {locations.map((location, index) => (
          <View key={location.title} style={[styles.locationItem, index >= locations.length - 2 && styles.lastLocationItem]}>
            <Image source={{ uri: location.image }} style={styles.image} />
            <Text style={styles.locationTitle}>{location.title}</Text>
            <Text style={styles.locationDescription}>{location.places.map(place => place.name).join(' ')}</Text>
            <Button title="View Details" onPress={() => navigateToInfo(location)} color="darkorange" />
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'top',
    paddingTop: 50,
    backgroundColor: 'lightyellow',
  },
  title: {
    marginTop: 30,
    marginBottom: 15,
    fontSize: 40,
    color: 'black',
    paddingHorizontal: 15,
    borderWidth: 4,
    borderColor: 'darkorange',
    fontWeight: 'bold',
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  locationItem: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  lastLocationItem: {
    marginBottom: 150,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: '#ffa970',
    fontWeight: 'bold',
    borderRadius: 10,
  },
  separator: {
    height: 3,
    backgroundColor: 'black',
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
  },
  nav: {
    padding: 10,
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


export default HomeScreen;
