import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import TButton from './core/TButton'
import axiosClient from '../axios';
import { userDetails } from '../context/ContextProvider';



export default function QuizListItem({q,  index, onQuestionsUpdate, onDeleteQuestion}) {

const [editQuizId, setEditQuizId] = useState(null); // Track the record being edited
const [editedRecord, setEditedRecord] = useState({}); 
const { showToast } = userDetails()
  // Store the current changes


const handleEditClick = (q) => {
  setEditQuizId(q.id);
  setEditedRecord(q); // Store current record values to be edited
};

const handleInputChange = (event) => {
  const { name, value } = event.target;
          // setEditedRecord({
          //   ...editedRecord['options'],
          //      [name]: value,  // Update the record values as user types
          // });
    
            setEditedRecord({
              ...editedRecord,
              [name]: value,  // Update the record values as user types
        });
};

  // Function to handle input change for 'options' array
  const handleOptionChange = (event, optionKey) => {
    const { value } = event.target;
    setEditedRecord({
      ...editedRecord,
      options: {
        ...editedRecord.options,
        [optionKey]: value,  // Update the option values dynamically
      }
    });
  };


    // Function to handle save button click (AJAX to update record)
    const onSubmit = async (recordId) => {
      try {
        const response = await axiosClient.patch(`question/${recordId}`,  editedRecord );
        console.log('Record updated:', response.data);
        const updatedRecord = response.data.record; // Assuming the response returns the updated record

      // Call the parent function to update the state in the parent component a callback funtion
       onQuestionsUpdate(updatedRecord);
  
        // Reset after successful update
        setEditQuizId(null);
        showToast('The Quiz was successfully updated')
   
      } catch (error) {
        console.error('Failed to update record:', error);
      }
    };


    const onDelete = async (recordId) => {

      if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await axiosClient.delete(`question/${recordId}` );
        console.log('Record deleted :');
      // inform the parent component for rerender 
        onDeleteQuestion(recordId);
        // Reset after successful update not neccasary but to free memory 
        setEditQuizId(null);
        showToast('The Quiz was successfully deleted')
   
      } catch (error) {
        console.error('Failed to update record:', error);
      }}
    };


  return (
       <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 ">
         {
            editQuizId === q.id ? 
            (<div>
           
               <h3 className="mt-4 text-lg font-bold text-red">Edit Mode</h3>
                  <input
                  type="text"
                  name="quiz"
                  value={editedRecord.quiz}
                  onChange={(ev) => handleInputChange(ev)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              {/* {errors[recordIndex]?.quiz && <p className="error text-red text-sm">{errors[recordIndex].quiz[0]}</p>} */}

                  <ul role="list" className="divide-y divide-gray-100 list-inside">

                  {Object.keys(editedRecord.options).map((optionKey) => (
                <li key={optionKey} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                
                        <div className="min-w-0 flex-auto">
                        <label
                        htmlFor={optionKey}
                        className="block text-sm font-medium text-gray-700"
                        >
                        Option {optionKey}:
                        </label>

                        <p className="text-sm font-semibold leading-6 text-gray-900">
                        <input
                        type="text"
                        name={optionKey}
                        value={ editedRecord.options[optionKey]}
                        onChange={(event) => handleOptionChange(event, optionKey)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        </p>
                        </div>     
                  </div>
                </li>
                ))}
                {/* <Bullets options  = {{q.options}} /> */}
              </ul>
              <h4 className="mt-4 text-lg font-bold">Your Answer is: {q.answer}</h4>
              <h4 className="mt-4 text-lg font-bold">Select an Answer</h4>
                    <select id={q.id}  name='answer'   onChange={(ev) => handleInputChange( ev)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={editedRecord.answer} disabled>
                      -- Please choose an option --
                      </option>
                      <option value='A'>A</option>
                      <option value='B'>B</option>
                      <option value='C'>C</option>
                      <option value='D'>D</option>
                    </select>


                <div className="flex justify-between items-center mt-3">
                    <TButton onClick={()=> onSubmit(editedRecord.id)} >
                      <PencilSquareIcon className="w-5 h-5 mr-2 " />
                      Save Changes
                    </TButton>
                    <div className="flex items-center">
                      {editedRecord.id && (
                        <TButton onClick={() => setEditQuizId(null)} circle link color="red">
                          <TrashIcon className="w-5 h-5" /> Cancel
                        </TButton>
                      )}
                    </div>
                  </div>
            </div>)
            :
            (  // non editable 
            <div>
            <h4 className="mt-4 text-lg font-bold">{index+1}. {q.quiz}?</h4>
            <ul role="list" className="divide-y divide-gray-100 list-inside">
            {Object.entries(q.options).map(([k, v]) => (
                  
                  <li key={k} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                
                        <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{k}. {v}</p>
                        </div>     
                  </div>
                </li>
                ))}          
                {/* <Bullets options  = {{q.options}} /> */}
              </ul>
              <h4 className="mt-4 text-lg font-bold">Your Answer is: {q.answer}</h4>

                <div className="flex justify-between items-center mt-3">
                    <TButton onClick={()=>handleEditClick(q)}>
                      <PencilSquareIcon className="w-5 h-5 mr-2 " />
                      Edit
                    </TButton>
                    <div className="flex items-center">
                      {q.id && (
                        <TButton onClick={()=>onDelete(q.id)} circle link color="red">
                          <TrashIcon className="w-5 h-5" />
                        </TButton>
                      )}
                    </div>
                  </div>



             </div>
            )


         }
        
       

    
    </div>
  )
}
