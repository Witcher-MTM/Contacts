import React, { useState, useEffect } from 'react';
import { View, Text , StyleSheet, FlatList} from 'react-native';
import * as Contacts from 'expo-contacts';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  return (
    <View>
      {contacts.map(contact=>{
         <View style={styles.contactCon}>
         <View style={styles.imgCon}>
           <View style={styles.placeholder}>
             <Text style={styles.txt}>{contact.name}</Text>
           </View>
         </View>
         <View style={styles.contactDat}>
           <Text style={styles.name}>{contact?.name}</Text>
           <Text style={styles.phoneNumber}>
             {contact.phoneNumbers.number}
           </Text>
         </View>
       </View>
      })}
    </View>
    
    
  );
};
const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  contactDat: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: "#888",
  },
});
export default ContactList;
