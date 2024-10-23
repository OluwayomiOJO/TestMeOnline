import { createContext, useContext, useState } from "react";

const UserContext = createContext({
    // not neccasary, just for auto complete  
    // const userContext = createContext({}) would have surffice
    user: {},
    setUser: ()=>{},
    quizes : [],
    quizOptions : [],
    userToken : null,
    setUserToken : ()=>{},
    upperCaseFisrt : ()=>{},
    toast: {
        message: null,
        show: false,
      },
})




export const ContextProvider  = ({children})=>{
    const [user, setUser ] = useState({})

    const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '')
    const [toast, setToast] = useState({message: '', show: false})

    const setUserToken = (token)  =>{
        if (token) {
            localStorage.setItem('TOKEN', token)
        }else{
            localStorage.removeItem('TOKEN')
        }
        _setUserToken(token)
    }


   const  upperCaseFisrt= (str, mark= '')=>{
        if (str !== '') {
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()+mark
        }
        return str // str is null 
      }

      const showToast = (message) => {
        setToast({ message, show: true })
        setTimeout(() => {
          setToast({message: '', show: false})
        }, 5000)
      }

    return ( 
        <UserContext.Provider value={{
            user,
            setUser,
            userToken,
            setUserToken,
            upperCaseFisrt,
            toast,
            showToast
        
        }}>
          {children}
        </UserContext.Provider>
    )
}

export const userDetails = ()=> useContext(UserContext)