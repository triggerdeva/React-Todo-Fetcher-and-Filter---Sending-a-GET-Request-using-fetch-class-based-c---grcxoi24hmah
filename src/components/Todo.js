import React from 'react';

 export const Todo  = (props) =>{
    return (
        <>
            {props.list.map((elem)=><div className='todo' id={'todo-'+elem.id} key={elem.id+"ky"}>
                <div className='todo-title todo-text'>{elem.title}</div>
                <div className='todo-status'>{elem.completed?"Complete":"Incomplete"}</div>
                </div>)}
        </>
    )
 }
