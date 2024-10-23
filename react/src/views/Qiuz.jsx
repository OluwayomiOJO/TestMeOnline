import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import './Quiz.css'

export default function Qiuz() {


    let [index, setIndex ]= useState(0)
    let [lock, setLock ] = useState(false)
    let [score, setScore] = useState(0)
    let [lastPage, setLastPage ] = useState(false)
    

    const [quizes, setQuizes ] = useState([{}])  // array of empty objects
 

    const { user_id  } = useParams();
 
    
    const options_0 = useRef(null)
    const options_1 = useRef(null)
    const options_2 = useRef(null)
    const options_3 = useRef(null)

    let options = [options_0, options_1, options_2, options_3]
    let num = 0;
 
    const checkAnswer =(e, ans)=>{
      if (lock) {
          return
      }
         let ind
         switch (quizes[index].answer) {
          case 'A':
            ind = 0
            break;
          case 'B':
            ind = 1
            break;
          case 'C':
            ind = 2
            break;
          case 'D':
              ind = 3
              break;
         
          default:
            ind = null
            break;
         }

      if (quizes[index].answer === ans) {
          e.target.classList.add('correct');
          setScore(prev=>prev+1)
      }else{
          e.target.classList.add('wrong');
          options[ind].current.classList.add('correct')
      }
      setLock(true)
  }

  const next = ()=>{
      if (lock) {
        if (index === quizes.length-1) {
          setLastPage(true)
            return null
      }
      setIndex(index + 1)
      setLock(false)
      localStorage.removeItem('answer')
      options.map((option)=>{
        option.current.classList.remove('correct')
        option.current.classList.remove('wrong')
          return null
      }

      )
      }
}


const reset = ()=>{
setIndex(0);
setLock(false)
setScore(0)
setLastPage(false)
}


useEffect(() => {
   axiosClient
     .get(`questions/fetch_by_id/${user_id}`)
     
   .then(({ data })=>{
    
    setQuizes(data.data)
   

   })

 },[]
 )



  return (
    <>

    
    <div className='container'>
    <h2>Quiz App</h2>
    <hr />
    {lastPage? <>
      <h2>You Scored:  {score} out of {quizes?.length}</h2>
      <button onClick={reset}>Reset</button>
     </>:<>
    <h2>{index + 1}. {quizes[index]?.quiz}?</h2>
    <ul>
    {quizes[index]?.options && Object.entries(quizes[index]?.options).map(([key, value], optionIndex) => (
         
          <li ref={options[optionIndex]} key={key} onClick={(e) => {checkAnswer(e, key)}}>{value}</li>
        ))}
    </ul>
    <button onClick={next}>Next</button>
    <div className="index"> {index+1} of {quizes?.length} Questions</div>
     </> } 
     
    </div>
    </>
  )
}