import React, { RefObject, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import BottomSheet from '../ui/BottomSheet';
import { SIZES } from '../../constants';
import SearchInputBS from './SearchInputBS';

type Props = {
  bsRef: RefObject<any>;
};

const SpeedSendBS = ({ bsRef }: Props) => {
  const [value, setValue] = useState('');

  return (
    <BottomSheet refs={bsRef} draggable={false} height={SIZES.s400}>
      <View style={styles.mainContainer}>
        <SearchInputBS
          value={value}
          handleValue={(value: string) => setValue(value)}
          handleBack={() => bsRef.current.close()}
        />
      </View>
    </BottomSheet>
  );
};

export default SpeedSendBS;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
