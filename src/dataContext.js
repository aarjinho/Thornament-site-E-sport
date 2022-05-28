import React,{useState, createContext,useEffect} from 'react'
import {db, auth} from "./firebase-config"
import {collection, getDocs, doc , addDoc, updateDoc,getDoc,getFirestore} from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'

export const DataContext = createContext()

export default function DataContextProvider(props) {

//----------------On recupere les données de la base de donnée ici ---------------------
    const [games, setGames] = useState()
    const [tournaments, setTournaments] = useState()
    const [users,setUsers] = useState()

    const gamesRef = collection(db, "Games")
    const tournamentsRef = collection(db,"Tournaments")
    const usersRef = collection(db,"Users")



    useEffect( () => {    

        //renvoi la collection "Games"
        async function getGames () {
            const data = await getDocs(gamesRef) //les données en brut (non manipulable)
            var jeux = data.docs.map(doc => ({...doc.data(),  id: doc.id}))//données manipulables
            setGames(jeux) //on met le state à ces données
        }

        //renvoi la colleciton "Tournaments"
        async function getTournaments () {
            const data = await getDocs(tournamentsRef) //les données en brut (non manipulable)
            var tournamentsData = data.docs.map(doc => ({...doc.data(),  id: doc.id}))//données manipulables
            setTournaments(tournamentsData) //on met le state à ces données
    
        }

        //renvoi la collections "Users"
        async function getUsers () {
            const data = await getDocs(usersRef) //les données en brut (non manipulable)
            var UsersData = data.docs.map(doc =>({...doc.data(),  id: doc.id}))//données manipulables
            setUsers(UsersData) //on met le state à ces données
        
        }
            getGames()
            getTournaments()
            getUsers()
      },[])  
  
      //Données sur l'utilisateur courrant et des fonctions lié a l'authentification
      const [currentUser, setCurrentUser] = useState();
      const [loadingData, setLoadingData] = useState(true);
        
      //fonctions de login et register
      const signup = (email,password) => createUserWithEmailAndPassword(auth, email, password)
      const signin = (email,password) => signInWithEmailAndPassword(auth, email, password)
        
      //stock l'utilisateur courrant dans currentUser
      useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (curUser) => {
              setCurrentUser(curUser)
              setLoadingData(false)
          })
          return unsubscribe
      },[])

    //Ajout de données dans la base de données
      async function addDocument(col, data){
        await  addDoc(collection(db, col),data)
      }

      //fonction pour mettre à jour un document
      async function updateDocument(collection, id, data){
        const ref = doc(db,collection,id)
        await updateDoc(ref, data)
      }

      //fonction pour recuprer le tournoi grace a l'id 
      async function getbyid(id) {
  
        const docRef = doc(db, "Tournaments", id)
        const docSnap = await getDoc(docRef)
        const data = docSnap.exists() ? docSnap.data() : null
        if (data === null || data === undefined) return null
        return { id, ...data }
      }


      //renvoi les données associées à une email
      function getUserTable(email){
        if(users === undefined) return 
        let res
        users.map(user =>{
            if(user.Email === email){
              res = user}
        } )
            return res
      }
      
  return (
  //On envoi les data de la base de données à toute notre App pour que l'onglet qui en a besoin les recupere. Evite des appels multiples à la bd */}
    <DataContext.Provider value={{games, tournaments, users, currentUser, signup, signin, addDocument, updateDocument, getUserTable, getbyid}}>
        {!loadingData && props.children}
    </DataContext.Provider>
  )
}
