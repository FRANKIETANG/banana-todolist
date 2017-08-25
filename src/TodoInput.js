import React from 'react'
import './TodoInput.css'

export default function (props) {
    return <input type="text" value={props.content} 
    className="TodoInput" 
    onKeyPress={submit.bind(null,props)} 
    onChange={changeTitle.bind(null,props)}/>
}
function submit(props,e) {
    if (e.key === 'Enter') {
        if (e.target.value.trim() !== ''){
            props.onSubmit(e)
        }
    }
}
function changeTitle(props,e){
    props.onChange(e)
}