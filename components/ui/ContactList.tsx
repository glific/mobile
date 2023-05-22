import React, { useEffect, useState } from "react";
import { FlatList, Text, View , StyleSheet} from "react-native";
import { GET_CONTACTS } from "../../graphql/queries/getContacts";
import { useQuery } from "@apollo/client";
import { Contacts } from "../../constants/interfaces";
import Contact from "./Contact";
import { CONTACT_LIST_VARIABLE } from "../../constants/graphql_variables";
import Loading from "./Loading";

const ContactList: React.FC = () => {

    const [contacts, setContacts] = useState<Contacts[]>([]);

    const { loading, error, data } = useQuery(GET_CONTACTS, { variables: CONTACT_LIST_VARIABLE });

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
        return <Loading />; // Display a loading indicator while the query is in progress
    }

    const contactItem = ({ item }: { item: Contacts; }) => <Contact name={item.name} />;

    return (
        <View style={styles.contactList}>
            <FlatList
                data={contacts}
                renderItem={contactItem}
                keyExtractor={(item) => item.index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contactList: {
        marginTop: 20,
        marginBottom:20,
    },
});

export default ContactList;
