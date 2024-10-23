import React, { useEffect, useRef, useState } from 'react'
import PageComponent from '../components/PageComponent';;
import TButton from '../components/core/TButton';
import axiosClient from '../axios';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { userDetails } from '../context/ContextProvider';

export default function QuestionPage() {
  const [errors, setErrors] = useState({});
  const [lock, setLock ] = useState(true)
  const [ localAnswer, setLocalAnswer ] = useState([])
  const navigate = useNavigate()
  const { upperCaseFisrt, showToast } =  userDetails() 


 


  const [quizes, setQuizes ] = useState([{
    quiz : '',
    options : {
         A: "",
         B: "",
         C: "",
         D: ""

  },
    answer : ""
  }])

// Handle input change for each record
const handleInputChange = (recordIndex, ev, opt = false) => {

  const { name, value } = ev.target;
  const newRecords = [...quizes];

      setLock(false);

      if (opt) {
        newRecords[recordIndex].options[name] = value;
      } else {
        newRecords[recordIndex][name] = value;
        
   } 
  
    setQuizes(newRecords);
};

const displayAnswer = (recordIndex,  ev) => {
  const { value } = ev.target;
  const newRecords = [...quizes];
  newRecords[recordIndex]['answer'] = value;
      
    setQuizes(newRecords);
    const { options } = quizes[recordIndex] // extract option from this specific record
    localAnswer[recordIndex] = options[value];
    setLocalAnswer([...localAnswer])  
   
   
};

  //a funtion that turns the first character of a string to capital and the rest lower letters 
  
  const handleAddRecord = () => {
      if (quizes.length < 5) {
        setQuizes([...quizes, { quiz: '', options: { A: '', B: '', C: '', D:'' }, answer: '' }]);
      }else{
       
      }
      
   
   
  };


  const onSubmit =  (ev) => {
    ev.preventDefault();
    setErrors({})
    let res = null;
      res =   axiosClient.post("/question", { quizes });
    res
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
        showToast('The Quiz was successfully added')
       
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
            setErrors(err.response.data.errors); // Set validation errors
        }
      });
  };


  return (
    <PageComponent
      title= "Create New Quizes"
    >
   
        <form action="#" method="POST" onSubmit={onSubmit}>
        
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
             
              {/*question*/}
              {quizes.map((record, recordIndex) => (
                
              <div key={recordIndex} className="col-span-6 sm:col-span-3">
                
                <label
                  htmlFor="quiz"
                  className="block text-sm font-medium text-gray-700"
                >
                 { <h4 className="mt-4 text-lg font-bold">Question  {recordIndex + 1}: { upperCaseFisrt(record.quiz, '?')}</h4>
                 }
                </label>
              

                <input
                  type="text"
                  name="quiz"
                  value={record.quiz}
                  onChange={(ev) => handleInputChange(recordIndex, ev)}
                  placeholder={`Question ${recordIndex + 1}`}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              {errors[recordIndex]?.quiz && <p className="error text-red text-sm">{errors[recordIndex].quiz[0]}</p>}
       
              <ul className="list-inside">
              <h4 className="mt-4 text-lg font-bold">Options</h4>
                    <div  style={{ marginLeft: '20px', marginBottom: '10px' }}>
                  {Object.keys(record.options).map((optionKey) => (
                   <li  className="flex justify-between gap-x-6 py-5">
                   <div className="min-w-0 flex-auto">
                       <label
                       htmlFor={optionKey}
                       className="block text-sm font-medium text-gray-700"
                       >
                       Option {optionKey}:
                       </label>
                       <input
                       type="text"
                       name={optionKey}
                       disabled={lock}
                       value={ record.options[optionKey]}
                       onChange={(event) => handleInputChange(recordIndex, event, true)}
                       placeholder="Type option A here"
                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       />
                       {errors[recordIndex]?.['options.A'] && <p className="error text-red text-sm">{errors[recordIndex].options[optionKey][0]}</p>}
                 </div>
                 </li>
                ))}

            </div>
       
            <h4 className="mt-4 text-lg font-bold">Select an Answer</h4>
                    <select id={recordIndex}  name='answer' disabled={lock}  onChange={(ev) => displayAnswer(recordIndex,  ev)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled>
                      -- Please choose an option --
                      </option>
                      <option value='A'>A</option>
                      <option value='B'>B</option>
                      <option value='C'>C</option>
                      <option value='D'>D</option>
                    </select>
                    {errors[recordIndex]?.answer && <p className="error text-red text-sm">{errors[recordIndex].answer[0]}</p>}
      </ul>
      { localAnswer[recordIndex] ?  ( <h4 className="mt-4 text-lg font-bold">Your answer to question {recordIndex + 1} is :{upperCaseFisrt(localAnswer[recordIndex])}</h4>): 'No answer yet'}

         
        </div>
      
              ))}
             
              {/*question*/}

              <div className="flex justify-between">  
                <h3 className="text-2xl font-bold">Questions</h3>
                <button
                  type="button"
                  className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                  onClick={() => handleAddRecord()}
                >
                  <PlusIcon className="w-4 mr-2"/>
                  Add question
                </button>
              </div>
            
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <TButton>Save All Questions</TButton>
            </div>
          </div>
        </form>
      
    </PageComponent>
  )
}
