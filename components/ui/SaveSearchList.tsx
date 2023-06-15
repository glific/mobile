import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import Loading from './Loading';
import { GET_SAVED_SEARCH } from '../../graphql/queries/SaveSearch';
import SaveScreenListItem from './SaveScreenListItem';

interface SaveSearchListProps {
  navigation: any;
  searchValue: String;
}

const SaveSearchList: React.FC<SaveSearchListProps> = ({ searchValue }) => {
  const variables = {
    filter: { term: searchValue },
    messageOpts: { limit: 1 },
    contactOpts: { limit: 10 },
  };
  const { loading, error, data } = useQuery(GET_SAVED_SEARCH, { variables });

  if (error) {
    console.log(error);
  }

  let contacts = [];
  if (data) {
    contacts = data.savedSearches.map((element: any) => {
      return {
        id: element.id,
        name: element.label || 'Unknmow',
      };
    });
  }

  return (
    <View style={styles.SaveSearchList}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={contacts}
          testID="flatlist"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SaveScreenListItem {...item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  SaveSearchList: {
    flex: 1,
    marginBottom: 20,
    zIndex: -50,
  },
});

export default SaveSearchList;
