import React, { RefObject, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS, SCALE, SIZES } from '../../constants';
import SearchInputBS from './SearchInputBS';
import BottomSheet from '../ui/BottomSheet';

type Props = {
  bsRef: RefObject<any>;
};

const dummy = [
  {
    id: 1,
    title: 'Common_transcation_2:',
    body: '{1} debited with {3} for {4}',
    type: 'text',
  },
  {
    id: 2,
    title: 'Begin the flow eng - chalo network 2 welcome',
    body: `Welcome to Chalo Network (https://chalo.network/)! I am your Chalo WhatsApp Saathi 🤝🏼. We help you with PAN (Permanent Account Number) services via WhatsApp Messenger.

🚨ALERT🚨
You have only *5 minutes* to respond to each of the messages.
    
What help do you want⬇️`,
    type: 'text',
  },
  {
    id: 3,
    title: 'Common_transcation_2:',
    body: '{1} debited with {3} for {4}',
    type: 'text',
  },
  {
    id: 4,
    title: 'Begin the flow eng - chalo network 2 welcome',
    body: `Welcome to Chalo Network (https://chalo.network/)! I am your Chalo WhatsApp Saathi 🤝🏼. We help you with PAN (Permanent Account Number) services via WhatsApp Messenger.

🚨ALERT🚨
You have only *5 minutes* to respond to each of the messages.
    
What help do you want⬇️`,
    type: 'text',
  },
];

const SpeedSendBS = ({ bsRef }: Props) => {
  const [value, setValue] = useState('');

  return (
    <BottomSheet refs={bsRef} draggable={false} height={SCALE(400)}>
      <View style={styles.mainContainer}>
        <SearchInputBS
          value={value}
          handleValue={(value: string) => setValue(value)}
          handleBack={() => bsRef.current.close()}
        />
        <ScrollView>
          {dummy.map((msg) => (
            <Pressable
              key={msg.id}
              style={styles.messageContainer}
              android_ripple={{ color: COLORS.primary10 }}
            >
              <MaterialCommunityIcons name="message-flash-outline" style={styles.messageIcon} />
              <View style={styles.message}>
                <Text style={styles.messageTitle}>{msg.title}</Text>
                <Text style={styles.messageText}>{msg.body}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default SpeedSendBS;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  message: {
    flex: 1,
    marginLeft: SIZES.m12,
  },
  messageContainer: {
    borderBottomWidth: SCALE(0.5),
    borderColor: COLORS.lightGray,
    flexDirection: 'row',
    height: 'auto',
    padding: SIZES.m12,
  },
  messageIcon: {
    color: COLORS.primary400,
    fontSize: SIZES.f20,
  },
  messageText: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    marginTop: SIZES.m4,
  },
  messageTitle: {
    color: COLORS.black,
    fontSize: SIZES.f14,
    fontWeight: '500',
  },
});
