import React, { useState } from 'react'
import { IncludedSrings, lowerLetters, nums, symbols, upperLetters } from './constants/checkbox'
import "./App.css"
const App = () => {
  const [charLength,setCharLength] = useState(4)
  const [password,setPassword] = useState("")
  const [copied,setCopied] = useState(false)
  const [error,setError] = useState(false)
  
  const [checkedBoxsVal, setCheckBoxesVal ] = useState({
    "UpperCase":false,
    "LowerCase":false,
    "Numbers":false,
    "Symbols":false,
  })


  const handleChange = (e) =>{
setCheckBoxesVal({...checkedBoxsVal, [e.target.name]: !checkedBoxsVal[e.target.name]})



  }

 function handleGeneratePass(){
  setError(false)

  let total =  IncludedSrings(checkedBoxsVal,setError)

  let newPass = ""

  for(let i= 0 ; i < charLength; i++){
   let randomNUm = Math.random() * total.length

   newPass = newPass + total[Math.floor(randomNUm)]

    

  }
  if(newPass.includes("undefined")){
    setError(true)
    setPassword("")
 }else{
  setPassword(newPass)
  }
 }
 
 function handleCopy(){
  if(password){ navigator.clipboard.writeText(password)
    setCopied(true)
  }
  
  setTimeout(() => {
    setCopied(false)
  }, 1000);
 }
 
  return (
    <>
   <div className='main-div'>
{   copied && <p style={{color:"white",fontSize:"1.1rem" }}> copied</p>
}

{password && <div className='header' >     
        <p className='password-text' >{password}</p>
        <button onClick={handleCopy} className='copy-btn' >copy</button>
        
        </div>}

      <div className='charLength' >
        <h4>Chartecter Lenghth</h4>
        <h4>{charLength}</h4>
      </div>

      <input style={{width:"100%"}} type='range' min={4} max={12} onChange={(e)=>setCharLength(e.target.value)} />
<div>
      <div>
      <input type='checkbox' name='UpperCase' onClick={handleChange}/>
      <span> Include Upper Case Letters</span>
      </div>
      <div>
      <input type='checkbox' name='LowerCase' onClick={handleChange}/>
      <span> Include Lower Case Letters</span>
      </div>
      <div>
      <input type='checkbox' name='Numbers' onClick={handleChange}/>
      <span> Include Numbers</span>
      </div>
      <div>
      <input type='checkbox' name='Symbols' onClick={handleChange}/>
      <span> Include Symbols</span>
      </div>
      </div>
      {error && <p style={{fontSize:"1rem"}}>Please select Check boxes</p>
 }
            <button className='final-btn' onClick={handleGeneratePass}>Genete</button>
    
    </div>
    </>
  )
}

export default App