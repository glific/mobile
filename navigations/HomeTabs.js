import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from '../screens/Chat';
import Collections from '../screens/Collections';
import SavedSearches from '../screens/SavedSearches';
import { Colors } from '../constants/styles';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarStyle: { backgroundColor: Colors.primary10, elevation: 0, shadowOpacity: 0 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 700 },
        tabBarActiveTintColor: Colors.primary400,
        tabBarInactiveTintColor: Colors.primary70,
        tabBarIndicatorStyle: { backgroundColor: Colors.primary400 },
        tabBarAndroidRipple: { borderless: true, color: Colors.primary70 },
      }}
    >
      <Tab.Screen name="Contacts" component={Chat} />
      <Tab.Screen name="Collections" component={Collections} />
      <Tab.Screen
        name="SavedSearches"
        component={SavedSearches}
        options={{ title: 'Saved Searches' }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
