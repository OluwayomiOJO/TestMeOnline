import {  PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/TButton";
import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline";
import QuizListItem from "../components/QuizListItem";
import { useEffect, useState } from "react";
import axiosClient from "../axios";

export default function Dashboard() {

  const [quizes, setQuizes ] = useState([]) 
  const [loading, setLoading] = useState(true);


  
  const onDeleteClick = async  ()=>{
    if (window.confirm("Are you sure you want to delete all your questions?")) {

      try {
        const response = await axiosClient.delete('questions' );
        console.log('Records deleted :');
        setQuizes([])
   
      } catch (error) {
        console.error('Failed to update record:', error);
      }


    }
}

// if from the current question, anyone macthes the  updated id, then change to the current and re render 
const onQuestionsUpdate = (updatedRecord) => {
  setQuizes((prevRecords) =>
    prevRecords.map((record) =>
      record.id === updatedRecord.id ? updatedRecord : record
    )
  );
}

const onDeleteQuestion = (deletedRecordId) => {
  setQuizes((prevRecords) => prevRecords.filter(record => record.id !== deletedRecordId));
};


useEffect(() => {
  setLoading(true);
  axiosClient
    .get(`/dashboard`)
    .then(( { data }) => {
  
      setLoading(false);
      setQuizes(data.data);
      return res;
    })
    .catch((error) => {
      setLoading(false);
      return error;
    });
}, []);

  return (
    <>
     
      {!quizes.length ? 
      
      ( <PageComponent
        title="No Questions"
        buttons={
          <TButton color="green" to="/questions/create">
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Create new Question
          </TButton>
        }
      >
      
       <h1>You don't have any questions yet</h1>
  

         </PageComponent>
         )
      :
      ( <PageComponent title='Question Dashboard'   buttons={
        <div className="flex gap-2 px-10">
          <TButton color="green" to={`/question/public/${quizes[0].user_id}`}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Public Link
          </TButton>
          <TButton color="red" onClick={onDeleteClick}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete All Quizes
          </TButton>
          {quizes.length < 5 && (
        
        <TButton color="green" to="/questions/create">
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Add more Quizes
        </TButton>

        )}
        </div>
      }
      >
       { loading && (
        <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
            Loading...
         </button>
       )}
         
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          
          {quizes.map((q, index) =>(   
      
             <QuizListItem q={q} key={q.id}  index={index} onQuestionsUpdate = {onQuestionsUpdate} onDeleteQuestion={onDeleteQuestion}/>
          
          )

          )

          }
          </div>

  

         </PageComponent>)
      
      }
     
     
     
    </>
  )
}

