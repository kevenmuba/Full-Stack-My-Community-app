import React from 'react'
import { useAuth } from '../contextProvider/Context';

function TestContext() {
  const { isLogged, setIsLogged } = useAuth();
  console.log(useAuth())
  return (
    <div>
      {
        isLogged ? (<div>
          i think you  logged in now so you keep on
        </div>) : (
           
          <h1>
             i think you didn't login yet
        </h1>
          
        )
      }
      mmmm
      
    </div>
  )
}

export default TestContext
