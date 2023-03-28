import { createContext, useState } from "react";

const ContactsContext = createContext();

function Provider({ children }) {
  const [user, setUser] = useState({});
  // const [contactsList, setContactsList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const value = {
    user,
    setUser,
    // contactsList,
    // setContactsList,
    searchList,
    setSearchList,
  };
  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsContext;
export { Provider };
