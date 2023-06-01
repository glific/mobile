import React, { useState, useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ContactList from '../components/ui/ContactList';
import SearchBar from '../components/ui/SearchBar';
import Storage from '../utils/asyncStorage';
import { COLORS, SCALE, SIZES } from '../constants';
import { Entypo } from '@expo/vector-icons';

type RootStackParamList = {
  Contacts: undefined;
  Collections: undefined;
  SavedSearches: undefined;
  ContactList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

const Chat = ({ navigation }: Props) => {
  const [session, setSession] = useState<object | null>();
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve the session from AsyncStorage
    const getSession = async () => {
      const sessionValue = await Storage.getData('session');
      if (sessionValue !== null) {
        const parsedSessionValue = JSON.parse(sessionValue);
        setSession(parsedSessionValue);
      }
    };
    getSession();
  }, []);

  interface FilterButtonProps {
    label: string;
    count: number;
  }
  const FilterButton: React.FC<FilterButtonProps> = ({ label, count }) => {
    return (
      <Pressable
        onPress={() => console.log('')}
        style={styles.filter}
        android_ripple={{ color: COLORS.primary10 }}
      >
        <Text style={styles.filterText}>{label}</Text>
        <Text style={styles.filterText}>{`(${count})`}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <SearchBar />
        <View style={styles.mainIconContainer}>
          <Pressable
            onPress={() => setIsFilterVisible(true)}
            style={styles.iconContainer}
            android_ripple={{ borderless: true }}
          >
            <Entypo name="dots-three-vertical" style={styles.icon} />
          </Pressable>
          {isFilterVisible && (
            <>
              <Pressable
                onPress={() => setIsFilterVisible(false)}
                style={styles.filterBackground}
              />
              <View style={styles.filtersContainer}>
                <FilterButton label="All" count={1} />
                <FilterButton label="Unread" count={4} />
                <FilterButton label="Not responded" count={35} />
                <FilterButton label="Opt in" count={0} />
                <FilterButton label="Opt out" count={10} />
              </View>
            </>
          )}
        </View>
      </View>
      <ContactList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  icon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: 0.2,
    borderColor: COLORS.darkGray,
  },
  mainIconContainer: {
    marginLeft: -SIZES.m6,
    width: '15%',
  },
  filter: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.s40,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.m12,
    width: SIZES.s200,
  },
  filterText: {
    color: COLORS.black,
    fontSize: SIZES.f16,
  },
  filtersContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r4,
    bottom: -SCALE(220),
    elevation: SIZES.r4,
    paddingVertical: SIZES.m12,
    position: 'absolute',
    right: SIZES.m16,
    shadowColor: COLORS.black,
    zIndex: -50,
    shadowOffset: { height: SIZES.r4, width: 0 },
    shadowRadius: SIZES.r4,
    width: SIZES.s200,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: SIZES.m12,
    height: SIZES.s40,
    justifyContent: 'center',
    marginLeft: SIZES.m6,
    borderColor: COLORS.darkGray,
    width: SIZES.s36,
    borderWidth: 1,
  },
  filterBackground: {
    height: SIZES.height + 100,
    position: 'absolute',
    right: -10,
    top: -40,
    width: Dimensions.get('window').width + 20,
    zIndex: -50,
  },
});

export default Chat;
