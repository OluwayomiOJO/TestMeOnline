import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import QuizListItem from "../components/QuizListItem";
import { userDetails } from "../context/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";

export default function Questions() {
    const { quizes, user  } = userDetails(); 
    
    const onDeleteClick= ()=>{
        console.log(" I am deleted")
    }

const [quize, setQuize] = useState([]);



  useEffect(()=>{
     axiosClient.get('/questions/fetch')
     .then(({ data })=>{
        debugger
        setQuize()
     }

     )

  }

  ,[])

  function onQuestionsUpdate(questions) {
    setSurvey({
      ...survey,
      questions,
    });
  }
  return (
    <>
         <PageComponent title='Question Dashboard'   buttons={
        <div className="flex gap-2 px-10">
          <TButton color="green" href={`/questions/public/${user.id}`}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Public Link
          </TButton>
          <TButton color="red" onClick={onDeleteClick}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete All Quizes
          </TButton>
        </div>
      }
      >
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {quizes.map(quiz =>(
            <QuizListItem quiz={quiz} key={quiz.id} onDeleteClick={onDeleteClick} onQuestionsUpdate={onQuestionsUpdate}/>
          )

          )

          }
          </div>
         </PageComponent>
    </>
  )
}
