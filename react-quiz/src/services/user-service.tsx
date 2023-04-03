import { collection, query, where, getDocs, addDoc, doc, updateDoc, getDoc, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { UserContext } from "../UserContext";
import React, { useState, useContext, useEffect  } from "react";

class UserService{
    usersCollectionRef = collection(db, "users");
    user = useContext(UserContext);
    

    public async createUser(email:string, fname:string, lname:string){
        await addDoc(this.usersCollectionRef, {Id:auth.currentUser?.uid, Email: email,  FirstName: fname, LastName: lname, IsFilledQuiz:false, Points:0});
      };

    public async getUsers(){
      const data = await getDocs(this.usersCollectionRef);
      console.log(data);
      return data;
    }

    public async setPointsAndDailyQuizDone(point:number){
      if(auth.currentUser){
        
        const usersDocSnapshot = await getDocs(this.usersCollectionRef);
        //const userDocSnapshot = await getDoc(userDoc);

        usersDocSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          console.log(data);
          if(data.Id === auth.currentUser?.uid){
            const userDocRef = doc.ref;
            const currentPoints = data.Points;
            const newPoints = currentPoints + point;
            const newFields = { Points: newPoints, IsFilledQuiz: true };
            updateDoc(userDocRef, newFields);
          }
      });
      }
    }
    
}

export default UserService;
