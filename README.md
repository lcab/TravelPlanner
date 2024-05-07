# Welcome to our Group Project!

## Contributors:
- Lorena Cabrera
- Andrea Coyotl

## Work Distribution:
- Home: Andrea
- Location Information: Andrea
- Signin: Lorena
- Signup: Lorena
- Stored Itinerary: Andrea
- Settings: Lorena
- Styles: Lorena

## How to Use:
1. Install dependencies: `npm install`
2. Navigate to the repository directory and run: `npx expo start`
3. Scan the QR code with the Expo Go app
4. You will be directed to the home page

## Page Components:

### Home:
1. HomeScreen Component:
Description: The main screen of the app, displaying a list of states and their top attractions.
Props:
    navigation: Navigation object provided by React Navigation.
Methods:
    navigateToInfo(location): Navigates to the location information screen.
Structure:
    Title displaying "Locations" and subtitle "Top 10 States To Visit".
    ScrollView containing a list of states with their images, titles, a concatenation of their place names, and a "View Details" button.
    Each state is rendered as a separate View component with an image, title, concatenated place names, and "View Details" button.
    "View Details" button triggers navigateToInfo to navigate to the location information screen.

2. styles Object:
    Contains the styles for various components in the HomeScreen component.
### Location Information:
1. LocationInformation Component:
Description: This component displays information about a specific location, including its title and a list of places with     images and descriptions.
Props:
    route: Contains the parameters passed to the screen.
State:
    hearts: Stores the hearted places for the current user.
Methods:
    useEffect: Fetches hearted places from the database when the component mounts.
    toggleHeart(place): Toggles the heart status of a place.
    addHeart(place): Adds a place to the hearted list.
    removeHeart(place): Removes a place from the hearted list.
    isHearted(place): Checks if a place is hearted.
Structure:
    Header displaying the location title and a heart button.
    ScrollView containing a list of places with their images, names, descriptions, and heart buttons.
    Each place is rendered as a separate View component with an image, name, description, and heart button.

2. styles Object:
    Contains the styles for various components in the LocationInformation component.

### Stored Itinerary Screen:
1. StoredItineraryStack Component:
Description: This component handles the navigation stack for the stored itinerary feature. It contains screens for 
  displaying hearted places, selecting dates, and creating travel plans.
Props:
    route: Contains the parameters passed to the stack.
Screens:
    StoredItineraryScreen: Displays a list of hearted places with options to select start and end dates, and create travel         plans.
    CalendarScreen: Allows users to select dates for their travel plans.
    ItineraryScreen: Displays the itinerary for a selected place.
Header:
    CustomHeader: Custom header component with navigation options for the calendar and stored itinerary screens.
State:
    selectedStartDate: Holds the selected start dates for places.
    selectedEndDate: Holds the selected end dates for places.
    heartedPlaces: Stores the hearted places fetched from the database.
    openStartDateCalendar: Keeps track of the currently open calendar for selecting start dates.
    openEndDateCalendar: Keeps track of the currently open calendar for selecting end dates.
Methods:
    handleStartDateSelect(placeName, date): Updates the selected start date for a place.
    handleEndDateSelect(placeName, date): Updates the selected end date for a place.
    removeHeart(place): Removes a hearted place from the list.
    isHearted(place): Checks if a place is hearted.
Structure:
    Header with navigation buttons for calendar and stored itinerary screens.
    List of hearted places with options to select start and end dates, remove heart, and create travel plans.

2. CustomHeader Component:
Description: Custom header component with navigation options for the calendar and stored itinerary screens.
Props:
    navigation: Navigation object.
Structure:
    View containing icons for navigating to the calendar and stored itinerary screens.

### Itinerary:
1. ItineraryScreen Component:
Description: This component provides a form-like interface for users to plan their daily trip itinerary.
State:
    days: An array of objects, where each object represents a day of the trip and contains an array of to-do items.
Methods:
    addDay(): Adds a new day to the itinerary.
    addTodo(dayIndex): Adds a new to-do item to the specified day.
    updateTodo(dayIndex, todoIndex, text): Updates the text of a to-do item.
    deleteTodo(dayIndex, todoIndex): Deletes a to-do item from the specified day.
    deleteDay(dayIndex): Deletes a day from the itinerary.
Structure:
    Title indicating "My Daily Trip Itinerary".
    Instructions on how to use the itinerary planner.
    Buttons to add a day and add a to-do item.
    Iteration over each day in the itinerary, displaying day number, to-do items, and delete buttons.

### Settings:
- Edit your profile information
- Change your name, email, password, and profile picture by clicking on the profile picture

### Sign In:
- Existing users can sign in using their email and password
- New users can create an account by clicking 'Sign Up'

### Sign Up:
- Create a new account with a valid email, a password of 6 or more characters, and your first and last name
- Choose a profile picture by clicking 'Choose a profile picture'
- Requirements are displayed at the bottom of the page for guidance
