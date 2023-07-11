import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { COLORS, SCALE, SIZES } from '../../constants';
import { getSessionTimeLeft } from '../../utils/helper';
import { RootStackParamList } from '../../constants/types';
import StartFlowPopup from '../messages/StartFlowPopup';
import ChatPopup from '../messages/ChatPopup';

interface ChatHeaderDataProps {
  conversationType: string;
  id: number;
  displayName: string;
  lastMessageAt: string;
}

interface MenuProps {
  icon: JSX.Element;
  text: string;
  onPress: () => void;
}

const MenuButton: React.FC<MenuProps> = ({ icon, text, onPress }) => {
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

const ChatHeader: React.FC<ChatHeaderDataProps> = ({
  conversationType,
  id,
  displayName,
  lastMessageAt,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showMenu, setShowMenu] = useState(false);
  const [showStartFlowModal, setShowStartFlowModal] = useState(false);
  const [popupTask, setpopupTask] = useState('');
  const [showTerminateFlowModal, setshowTerminateFlowModal] = useState(false);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  const openFlowModal = () => {
    setShowMenu(!showMenu);
    setShowStartFlowModal(true);
  };
  const closeFlowModal = () => {
    setShowStartFlowModal(false);
    setshowTerminateFlowModal(false);
  };

  const openTerminateFlowModal = (task: string) => {
    setpopupTask(task);
    setShowMenu(!showMenu);
    setshowTerminateFlowModal(true);
  };

  let menu;
  let sessionTimeLeft;
  if (conversationType === 'contact') {
    sessionTimeLeft = (
      <View style={styles.sessionContainer}>
        <Text testID="timeLeft" style={styles.time}>
          Time left: {getSessionTimeLeft(lastMessageAt)}hrs
        </Text>
      </View>
    );
    menu = (
      <View testID={'contactChatMenu'} style={styles.menuContainer}>
        <MenuButton
          text="Start a flow"
          icon={<MaterialCommunityIcons name="message-cog" style={styles.menuIcon} />}
          onPress={() => {
            openFlowModal();
          }}
        />
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
            openTerminateFlowModal('clear');
          }}
        />
        <MenuButton
          text="Terminate Flows"
          icon={<MaterialCommunityIcons name="hand-back-right-off" style={styles.menuIcon} />}
          onPress={() => {
            openTerminateFlowModal('terminate');
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
    );
  } else {
    sessionTimeLeft = <></>;
    menu = (
      <View testID={'collectionChatMenu'} style={styles.menuContainer}>
        <MenuButton
          text="Start a flow"
          icon={<MaterialCommunityIcons name="message-cog" style={styles.menuIcon} />}
          onPress={() => {
            openFlowModal();
          }}
        />
        <MenuButton
          text="Add contact"
          icon={<Ionicons name="person-add-sharp" style={styles.menuIcon} />}
          onPress={() => {
            console.log('1');
          }}
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <AntDesign
          testID="backIcon"
          name="arrowleft"
          style={styles.backButton}
          onPress={(): void => navigation.goBack()}
        />
        <Pressable
          testID="profileButton"
          style={styles.innerContainer}
          android_ripple={{ color: COLORS.primary70 }}
          onPress={() =>
            navigation.navigate('ContactProfile', {
              contact: {
                id: id,
                conversationType: conversationType,
                name: displayName,
                lastMessageAt: lastMessageAt,
              },
            })
          }
        >
          <View testID="userProfile" style={styles.avatar}>
            <Text style={styles.avatartext}>{displayName.charAt(0)}</Text>
          </View>
          <Text testID="userName" style={styles.nameText} numberOfLines={1}>
            {displayName}
          </Text>
        </Pressable>
        <Pressable
          testID="menuIcon"
          onPress={handleMenu}
          style={styles.threeDotIconContainer}
          android_ripple={{ borderless: true }}
        >
          <Entypo name="dots-three-vertical" style={styles.threeDotIcon} />
        </Pressable>
        {showMenu && (
          <>
            <Pressable onPress={handleMenu} style={styles.menuBackground} />
            {menu}
          </>
        )}
        <StartFlowPopup
          id={id}
          conversationType={conversationType}
          visible={showStartFlowModal}
          onClose={closeFlowModal}
        />
        <ChatPopup
          id={id}
          visible={showTerminateFlowModal}
          task={popupTask}
          onClose={closeFlowModal}
        />
      </View>
      {sessionTimeLeft}
    </>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.r20,
    flexDirection: 'row',
    height: SIZES.s40,
    justifyContent: 'center',
    width: SIZES.s40,
  },
  avatartext: {
    color: COLORS.primary400,
    fontSize: SIZES.f18,
    fontWeight: '500',
    includeFontPadding: false,
  },
  backButton: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: SCALE(22),
    paddingHorizontal: SIZES.m10,
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
    height: SIZES.s60,
    padding: '2%',
    width: '100%',
    zIndex: 10,
  },
  menuBackground: {
    height: SIZES.height,
    position: 'absolute',
    right: 0,
    top: 0,
    width: SIZES.width,
  },
  menuButton: {
    alignItems: 'center',
    flexDirection: 'row',
    height: SIZES.s40,
    paddingHorizontal: SIZES.m10,
    width: '100%',
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.r4,
    elevation: 4,
    justifyContent: 'space-around',
    paddingVertical: SIZES.m10,
    position: 'absolute',
    right: SIZES.m16,
    shadowColor: COLORS.black,
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 4,
    top: SIZES.s44,
    width: SCALE(210),
  },
  menuIcon: {
    color: COLORS.primary100,
    fontSize: SIZES.s20,
    marginRight: SIZES.m10,
  },
  menuText: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    includeFontPadding: false,
  },
  nameText: {
    color: COLORS.white,
    flex: 1,
    fontSize: SIZES.f18,
    fontWeight: '500',
    marginLeft: SIZES.m10,
  },
  sessionContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SIZES.m6,
  },
  threeDotIcon: {
    color: COLORS.white,
    fontSize: SIZES.f20,
  },
  threeDotIconContainer: {
    paddingHorizontal: SIZES.m6,
  },
  time: {
    fontSize: SIZES.f14,
  },
});
