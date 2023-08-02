import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import ContactCard from '../components/ContactCard';
import { COLORS, SCALE, SIZES } from '../constants';
import { SAVED_SEARCH_QUERY } from '../graphql/queries/Search';
import Loading from '../components/ui/Loading';
import SearchBarDropdown from '../components/ui/SearchBarDropdown';
import { ChatEntry } from '../constants/types';
import { GET_CONTACTS } from '../graphql/queries/Contact';

interface Contact {
  id: string;
  lastMessageAt: string | null;
  name: string | null;
  maskedPhone: string | null;
  isOrgRead: boolean;
}
interface Message {
  id: string;
  body: string;
}
interface ContactElement {
  contact?: Contact;
  messages: Message[];
}

const SavedSearches = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [savedSearch, setSavedSearch] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedSearchId, setSelectedSearchId] = useState('');

  // filter: { isReserved: false },
  const { loading: savedSearchLoading } = useQuery(SAVED_SEARCH_QUERY, {
    variables: {
      filter: {},
      opts: { limit: 20 },
    },
    onCompleted(data) {
      setSavedSearch(data.savedSearches);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [contacts, setContacts] = useState<ChatEntry[]>([]);
  const [searchVariable, setSearchVariable] = useState({
    filter: {},
    messageOpts: { limit: 0 },
    contactOpts: { limit: 0 },
  });
  const [pageNo, setPageNo] = useState(1);
  const [noMoreItems, setNoMoreItems] = useState(false);

  const { loading, refetch, fetchMore } = useQuery(GET_CONTACTS, {
    variables: searchVariable,
    onCompleted(data) {
      const newContacts: ChatEntry[] = data?.search?.map((element: ContactElement) => {
        const messagesLength = element.messages?.length || 0;
        return {
          id: element.contact?.id,
          name: element.contact?.name ? element.contact.name : element.contact?.maskedPhone,
          lastMessageAt: element.contact?.lastMessageAt,
          lastMessage: messagesLength > 0 ? element.messages[messagesLength - 1]?.body : ' ',
          isOrgRead: element.contact?.isOrgRead,
        };
      });

      setContacts(newContacts);
    },
    onError(error) {
      console.log(error);
    },
  });

  async function onSearchHandler() {
    setIsSearched(true);
    refetch(searchVariable);
  }

  const handleSetSearchVariable = (search) => {
    setSearchValue(search.label);
    setSelectedSearchId(search.id);
    const variables = JSON.parse(search.args);
    setSearchVariable({
      ...variables,
      messageOpts: { limit: 1 },
      contactOpts: { limit: 10, offset: 0 },
    });
    setPageNo(1);
    setNoMoreItems(false);
    onSearchHandler();
  };

  const handleLoadMore = () => {
    if (!isSearched || loading || noMoreItems) return;

    fetchMore({
      variables: {
        filter: searchVariable.filter,
        messageOpts: searchVariable.messageOpts,
        contactOpts: { ...searchVariable.contactOpts, offset: pageNo * 10 },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.search?.length) {
          setNoMoreItems(true);
          return prev;
        } else {
          if (fetchMoreResult.search.length < 10) setNoMoreItems(true);
          setPageNo(pageNo + 1);
          return {
            search: [...prev.search, ...fetchMoreResult.search],
          };
        }
      },
    });
  };

  return (
    <>
      <FlatList
        data={isSearched ? contacts : savedSearch}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) =>
          isSearched ? (
            <ContactCard
              key={index}
              id={item.id}
              name={item.name}
              lastMessage={item.lastMessage}
              lastMessageAt={item.lastMessageAt}
              isOrgRead={item.isOrgRead}
            />
          ) : (
            <Pressable style={styles.item} onPress={() => handleSetSearchVariable(item)}>
              <Text style={styles.name} key={item.id}>
                {item.label}
              </Text>
            </Pressable>
          )
        }
        ListHeaderComponent={
          <SearchBarDropdown
            setSearchVariable={handleSetSearchVariable}
            savedSearches={savedSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            selectedSearchId={selectedSearchId}
          />
        }
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>
              {isSearched
                ? 'Sorry, no results found!\nPlease try a different search.'
                : 'No Saved Searches'}
            </Text>
          )
        }
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        contentContainerStyle={styles.contentContainer}
        style={styles.mainContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      {loading && <Loading />}
    </>
  );
};

export default SavedSearches;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  emptyText: {
    alignSelf: 'center',
    color: COLORS.darkGray,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginTop: SIZES.m16,
    textAlign: 'center',
  },
  item: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: SCALE(0.25),
    borderColor: COLORS.darkGray,
    flexDirection: 'row',
    height: SIZES.s70,
    paddingHorizontal: '4%',
    width: '100%',
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    overflow: 'visible',
  },
  name: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    fontWeight: '600',
    marginLeft: SIZES.m16,
  },
});
