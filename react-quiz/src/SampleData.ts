export type QuestionState = {
    answers: string[],
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answer: string[];
    question: string;
    type: string;
}

// export type QuestionState = Question & { answers: string[]};




export const fetchQuizQuestions = () =>{

    const data : QuestionState[] = [
        {
            answers:['ichi', 'ni', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'ichi',
            difficulty: 'easy',
            incorrect_answer: ['ni', 'go', 'roku'],
            question: '1',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        },
        {
            answers:['ichi', 'san', 'go', 'roku'],
            category:'numbers',
            correct_answer: 'roku',
            difficulty: 'easy',
            incorrect_answer: ['san', 'go', 'ichi'],
            question: '6',
            type:'multiple'
        }
    ]

    return data;
}