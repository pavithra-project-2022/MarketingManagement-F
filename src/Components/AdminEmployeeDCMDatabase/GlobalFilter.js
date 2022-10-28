import React, {useState} from 'react'
import {useAsyncDebounce} from 'react-table'

const GlobalFilter = ({filter, setFilter}) => {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce((value)=>{
        setFilter(value||undefined)
    },1000)
  return (
    <span>
        Search: {" "}
        <input style={{backgroundColor:"#e0dddd"}} value={value || ''} onChange={(e)=>
           { setValue(e.target.value)
            onChange(e.target.value)
        }}
        placeholder="Type here..." />
    </span>
  )
}

export default GlobalFilter