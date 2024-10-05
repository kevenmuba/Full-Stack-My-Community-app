// Import React and the Hooks we need here 
import React, { useState, useEffect, useContext } from "react";
// Import the Util function we created to handle the reading from the local storage 
import getAuth from '../util/auth';
// Create a context object  
const AuthContext = React.createContext();
console.log(getAuth)

export const useAuth = () => {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHr, setIsHr] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isSmm, setIsSmm] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const[isSalesman,setIsSalesman] = useState(false);
  const[accountant,setIsAccountant] = useState(false);


  //'admin', 'social_media_manager', 'salesman', 'writer', 'hr', 'customer', 'accountant'


  
  const [member, setMember] = useState(null);

  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged,isSmm,setIsSmm,accountant,setIsAccountant,isWriter,setIsWriter,isHr,setIsHr,isCustomer,setIsCustomer,isSalesman,setIsSalesman, member };

  // useEffect(() => {
  //   // Retrieve the logged in user from local storage
  //   const loggedInmember = getAuth();
  //   // console.log(loggedInmember);
  //   loggedInmember.then((response) => {
  //     // console.log(response);
  //     if (response.token) {
  //       setIsLogged(true);
  //       console.log(response)

  //       setMember(response);
  //       // 1 is the role for admin you can see your api
  //       if (response.role === 'admin') {
  //         setIsAdmin(true);
  //       }

  //       if (response.role === 'social_media_manager') {
  //         setIsSmm(true);
  //       }

  //       if (response.role === 'salesman') {
  //         setIsSalesman(true);
  //       }

  //       if (response.role === 'writer') {
  //         setIsWriter(true);
  //       }

  //       if (response.role === 'hr') {
  //         setIsHr(true);
  //       }

  //       if (response.role === 'customer') {
  //         setIsCustomer(true);
  //       }

  //       if (response.role === 'accountant') {
  //         setIsAccountant(true);
  //       }
       
       
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const fetchMemberData = async () => {
      const loggedInMember = await getAuth();
      if (loggedInMember.token) {
        setIsLogged(true);
        setMember(loggedInMember);
  
        // Set user roles based on the decoded token
        switch (loggedInMember.role) {
          case 'admin':
            setIsAdmin(true);
            break;
          case 'social_media_manager':
            setIsSmm(true);
            break;
          case 'salesman':
            setIsSalesman(true);
            break;
          case 'writer':
            setIsWriter(true);
            break;
          case 'hr':
            setIsHr(true);
            break;
          case 'customer':
            setIsCustomer(true);
            break;
          case 'accountant':
            setIsAccountant(true);
            break;
          default:
            break;
        }
      }
    };
  
    fetchMemberData();
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

