import React from 'react'

export default function Bullets({ options }) {
   const arr = {...options}
  const bullets = ['A', 'B', 'C', 'D']
  return (
    <>
    <ul>
      {     

      (arr.map((option, ind) => (
        <li key={++index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
        
                <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{bullets[ind]}. {option.A}</p>
                 </div>     
          </div>
        </li>
      ))
    )
        }
      </ul>
    </>
        )
    }


