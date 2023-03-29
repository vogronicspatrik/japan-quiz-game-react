import { collection, query, where, limit, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { db } from '../config/firebase';

export type QuestionState = {
    answers: string[],
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answer: string[];
    question: string;
    type: string;
}

interface Word {
    hun: string;
    jpn: string;
    category: string;
  }

class QuestionService{
    wordsCollectionRef = collection(db, "words");


    getProperQuestions =  async (difficulty:string) => {
        const result : QuestionState[] = [];

        const words = await this.getAllWords();
        const random10 = this.get10RandomFromList(words);

        for(let i = 0; i < random10.length; i++){
            // console.log("------");
            // console.log("szo: " + random10[i].hun);
            // console.log("incorrEasy: " + (this.getIncorrectAnswersEasy(words, random10[i]).map(word => word.jpn).join("-")));
            // console.log("incorrMedium: " + (this.getIncorrectAnswersMedium(words, random10[i]).map(word => word.jpn).join("-")));
            // console.log("incorrHard: " + (this.getIncorrectAnswersHard(words, random10[i]).map(word => word.jpn).join("-")));
            // console.log("------");
            const actualQuestion: QuestionState = {
                answers: [],
                category: '',
                correct_answer: '',
                difficulty: '',
                incorrect_answer: [],
                question: '',
                type: ''
                };
            actualQuestion.question = words[i].hun;
            actualQuestion.category = words[i].category;
            actualQuestion.correct_answer = words[i].jpn;
            actualQuestion.answers.push(words[i].jpn);
            let incAns: Word[] = [];
            if(difficulty === "easy"){
                incAns = this.getIncorrectAnswersEasy(words, random10[i]);
            }
            else if(difficulty === "medium"){
                incAns = this.getIncorrectAnswersMedium(words, random10[i]);
            }
            else if(difficulty === "hard"){
                incAns = this.getIncorrectAnswersHard(words, random10[i]);
            }

            incAns.map(word => actualQuestion.incorrect_answer.push(word.jpn));
            incAns.map(word => actualQuestion.answers.push(word.jpn));


            
            this.shuffleArray(actualQuestion.answers);
            result.push(actualQuestion);
        }

        return result;
    }

    getIncorrectAnswersHard(words: Word[], correctWord: Word){
        const filterWords = words.filter((word) => {
            return word.category === correctWord.category && word.hun != correctWord.hun ;
        }).slice(0,3);
        return filterWords;
    }

    getIncorrectAnswersEasy(words: Word[], correctWord: Word){
        const categories = new Set(words.map(word => word.category));
        const groupedWords = Array.from(categories).map(category => {
            return words.reduce((acc: Word[], curr: Word) => {
                if (curr.category === category && curr !== correctWord) {
                    acc.push(curr);
                }
                return acc;
            }, []);
        });
        const incorrectWords = groupedWords.reduce((acc, curr) => {
            if (curr.length > 0) {
                acc.push(curr[Math.floor(Math.random() * curr.length)]);
            }
            return acc;
        }, []);

        const result = incorrectWords.filter((word) =>{
            return word.category != correctWord.category;
        }).slice(0,3);
        return result;
    }

    getIncorrectAnswersMedium(words: Word[], correctWord: Word){
        const tempResult : Word[] = [];
        const filterWords = words.filter((word) => {
            return word.category != correctWord.category;
        });
        tempResult.push(filterWords[0]);

        const filteredByCategory = filterWords.filter((word) => {
            return word.category === tempResult[0].category;
        });
        return filteredByCategory.slice(0,3);
    }

    get10RandomFromList(words: Word[]){
        const randoms = words;
        this.shuffleArray(randoms);
        return randoms.slice(0,10);
    }

    shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    
    async getAllWords(){
        const querySnapshot = await getDocs(this.wordsCollectionRef);

        const words :Word[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            words.push({
                hun: data.hun,
                jpn: data.jpn,
                category: data.category
                });
        });
        return words;
    }
}

export default QuestionService;


// {
//     answers:['ichi', 'ni', 'go', 'roku'],
//     category:'numbers',
//     correct_answer: 'ichi',
//     difficulty: 'easy',
//     incorrect_answer: ['ni', 'go', 'roku'],
//     question: '1',
//     type:'multiple'
// }