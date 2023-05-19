import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GET_CONTACTS } from "../../graphql/queries/getContacts";
import { useQuery } from "@apollo/client";
import { Contact } from "../../constants/interfaces";

const ContactList: React.FC = () => {

    const [contacts, setContacts] = useState<Contact[]>([]);

    const { loading, error, data } = useQuery(GET_CONTACTS, {
        variables: {
            searchFilter: {
                includeTags: [],
                includeGroups: [],
                includeUsers: [],
            },
            messageOpts: {
                limit: 3,
                order: "ASC",
            },
            contactOpts: {
                order: "DESC",
                limit: 10,
            },
        }
    });

    useEffect(() => {
        if (data) {
            const updatedContacts = data.search.map((element: any, idx: number) => {
                return { index: idx, name: element.contact?.name || "Unknown Name", };
            });
            setContacts(updatedContacts);
        }
        if (error) {
            console.error(error); // Handle the error
        }
    }, [data, error]);


    if (loading) {
        return <Text>Loading...</Text>; // Display a loading indicator while the query is in progress
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={({ item }: { item: Contact }) => (
                    <View style={styles.contactItem}>
                        <Text style={styles.contactName}>{item.index} {item.name}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        height: 50,
        width: 200,
    },
    contactItem: {
        backgroundColor: "red",
        marginBottom: 16,
    },
    contactName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    contactEmail: {
        fontSize: 14,
        color: "gray",
    },
});

export default ContactList;
