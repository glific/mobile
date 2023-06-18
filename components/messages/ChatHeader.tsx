import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { COLORS } from '../../constants';

interface DataProps {
  contact: {
    id: number;
    name: string;
  };
}

interface MenuProps {
  icon: JSX.Element;
  text: string;
  onPress: () => void;
}

const MenuButton: React.FC<MenuProps> = ({ icon, text, onPress }: any) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.menuButton}
      android_ripple={{ color: COLORS.primary10 }}
    >
      {icon}
      <Text style={[styles.menuText, text === 'Block Contact' && { color: COLORS.error100 }]}>
        {text}
      </Text>
    </Pressable>
  );
};

const ChatHeader: React.FC<DataProps> = ({ contact }) => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);
  const [background] = useState<boolean>(true);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.mainContainer}>
      <AntDesign
        testID="backButton"
        name="arrowleft"
        style={styles.backButton}
        onPress={(): void => navigation.goBack()}
      />
      <Pressable
        style={styles.innerContainer}
        android_ripple={{ color: COLORS.primary70 }}
        onPress={() => navigation.navigate('ContactProfile', { contact :contact})}
      >
        <View>
          <Image
            testID="userProfile"
            source={require('../../assets/icon.png')}
            style={styles.avatar}
          />
          <View
            style={[
              styles.circle,
              { backgroundColor: background ? COLORS.primary100 : COLORS.darkGray }, // TODO: for online status
            ]}
          />
        </View>
        <Text testID="userName" style={styles.nameText}>
          {contact.name}
        </Text>
      </Pressable>
      <Pressable
        onPress={handleMenu}
        style={styles.threeDotIconContainer}
        android_ripple={{ borderless: true }}
      >
        <Entypo testID="menuIcon" name="dots-three-vertical" style={styles.threeDotIcon} />
      </Pressable>
      {showMenu && (
        <>
          <Pressable onPress={handleMenu} style={styles.menuBackground} />
          <View style={styles.menuContainer}>
            <MenuButton
              text="Add to Collection"
              icon={<Ionicons name="person-add-sharp" style={styles.menuIcon} />}
              onPress={() => {
                console.log('1');
              }}
            />
            <MenuButton
              text="Clear Conversation"
              icon={<MaterialCommunityIcons name="message-bulleted-off" style={styles.menuIcon} />}
              onPress={() => {
                console.log('2');
              }}
            />
            <MenuButton
              text="Terminate Flows"
              icon={<MaterialCommunityIcons name="hand-back-right-off" style={styles.menuIcon} />}
              onPress={() => {
                console.log('3');
              }}
            />
            <MenuButton
              text="Block Contact"
              icon={<Entypo name="block" style={[styles.menuIcon, { color: COLORS.error100 }]} />}
              onPress={() => {
                console.log('4');
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: 22,
    paddingHorizontal: 10,
  },
  circle: {
    borderColor: COLORS.primary400,
    borderRadius: 7.5,
    borderWidth: 2,
    bottom: -4,
    height: 15,
    position: 'absolute',
    right: -4,
    width: 15,
  },
  innerContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  mainContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.primary400,
    flexDirection: 'row',
    height: 60,
    padding: '2%',
    width: '100%',
    zIndex: 50,
  },
  menuBackground: {
    height: 800,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 500,
  },
  menuButton: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 12,
    width: '100%',
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    bottom: -180,
    elevation: 4,
    height: 190,
    justifyContent: 'space-around',
    paddingVertical: 10,
    position: 'absolute',
    right: 16,
    shadowColor: COLORS.black,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 4,
    width: 220,
  },
  menuIcon: {
    color: COLORS.primary100,
    fontSize: 22,
    marginRight: 10,
  },
  menuText: {
    color: COLORS.black,
    fontSize: 16,
  },
  nameText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
    marginLeft: 10,
  },
  threeDotIcon: {
    color: COLORS.white,
    fontSize: 20,
  },
  threeDotIconContainer: {
    paddingHorizontal: 6,
  },
});
