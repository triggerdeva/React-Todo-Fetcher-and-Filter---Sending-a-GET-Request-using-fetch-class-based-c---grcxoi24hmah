import React,{useState,useEffect} from 'react'
import '../styles/App.css';
import { Loader } from './Loader';
import { Todo } from './Todo';
let arr;
const App = () => {
  const [isLoading,setIsLoading]=useState(true);
  const [list,setList]=useState([]);
  const [checkedItems,setCheckedItems]=useState({completed:true,incompleted:true});
  function completefunc(){
    const obj={completed:!checkedItems.completed,incompleted:checkedItems.incompleted}
    setCheckedItems(obj);
    createlist(obj);
  }
  function incompletefunc(){
    const obj={completed:checkedItems.completed,incompleted:!checkedItems.incompleted}
    setCheckedItems(obj);
    createlist(obj);
  }
  useEffect(()=>{
    async function fetchApi(){
        const res=await fetch('https://jsonplaceholder.typicode.com/todos');
        const data=await res.json();
        arr=data.slice(0,20);
        createlist(checkedItems);
        setIsLoading(false);
    }
    fetchApi();
  },[]);
  function createlist(obj){
    if(obj.completed && obj.incompleted){
        setList(arr);
    }
    else if(obj.completed && !obj.incompleted){
        let temp=arr.filter((elem)=>elem.completed);
        setList(temp);
    }
    else if(!obj.completed && obj.incompleted){
        let temp=arr.filter((elem)=>!elem.completed);
        setList(temp);
    }
    else setList([]);
  }
  return(
    <div>
        {isLoading && <Loader />}
        {!isLoading && (<><Todo list={list}/>
        <div id="filter-holder">
            <input type={'checkbox'} id="completed-checkbox" onChange={completefunc} checked={checkedItems.completed}/>
            <input type={'checkbox'} id="incompleted-checkbox" onChange={incompletefunc} checked={checkedItems.incompleted}/>
            </div></>)}
    </div>
  );
}


export default App;
