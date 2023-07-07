import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [campus, setCampus] = useState({})
  const [campuses, setCampuses] = useState([])

  useEffect(() => {
    fetch('/campuses').then(async (response) => await response.json()).then(data => {
      setCampuses(data)//untested structure
    })
  },[campus])

  return (
    <>
      <select>
        {campuses.map(campus => <option value={campus.name}></option>)}
      </select>
     <input type="text" placeholder='campus name...'></input>
     <input type='button' >Create New</input>
    </>
  )
}

export default App
