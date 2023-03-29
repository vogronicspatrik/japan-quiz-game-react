import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from '../config/firebase';



class UserService{
    usersCollectionRef = collection(db, "users");
    

    public async createUser(email:string, fname:string, lname:string){
        console.log('start create user');
        await addDoc(this.usersCollectionRef, { Email: email,  FirstName: fname, LastName: lname});
      };
    
}

export default UserService;
