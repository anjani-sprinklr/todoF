
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Item from './item';
import { v4 as uuidv4as } from 'uuid';
import { addToLocal } from './utilitty';


function App():JSX.Element {
    interface Item{
        id:string,
        text:string,
        deadline:string,
        status:boolean
    }
  const [items,setItems]=useState<Item[]>([]);
  const [task,setTask]=useState<Item>({id:uuidv4as(),text:"",deadline:"",status:false});
  const [uri,setUri]=useState<string>('https://wallpapercave.com/wp/wp7507589.jpg');
  const [loading,setLoading]=useState<boolean>(true);

  const addItem=()=>{
    setItems((curi:Item[]) =>{
      addToLocal([...curi,task]); 
      return [...curi,task];
    });
    setTask({id:uuidv4as(), text:"",deadline:"",status:false});
  
  }

  const changeStatus=(itemId:string)=>{
  
    setItems((curi:Item[])=>{
      const citems= curi.map((item)=>{
        if(item.id===itemId){
          return {...item,status:!item.status};
        }else{
          return item;
        }
      });

      addToLocal(citems);
      return [...citems];
    });
  }

  const deleteItem=(itemId:string)=>{
    
    setItems((curi:Item[])=>{
      const citems=curi.filter((item)=>{
        return item.id!==itemId;
      });
      addToLocal(citems);
      return [...citems];
    });
    
  }
  
  const getPrevTasks= async()=>{
    const tasks= localStorage.getItem('tasks');
    if(tasks){
        // change varibale name as well ,else ts will give a conflict
        const parsedTasks=JSON.parse(tasks);
        setItems(parsedTasks);
    }
    // let t1=performance.now();
    let rn=Math.floor(Math.random() * (999 - 101 + 1)) + 101;
    try{
      const res=await axios.get('https://http.dog/'+rn+'.jpg');
      // let t2=performance.now();
      setUri('https://http.dog/'+rn+'.jpg')
      // console.log(res);
    }catch(e){
      console.log("Err");
    }finally{
      const res=await axios.get('https://http.dog/404.jpg');
      setUri('https://wallpapercave.com/wp/wp7507589.jpg');
      // let t2=performance.now();
      console.log(res);
    }
    
  }

  useEffect(()=>{
    setLoading(true);
    
    setTimeout(async()=>{
      await getPrevTasks();
      setLoading(false);
    },1000);
    
    
  },[]);
  return (
    <div className="App" style={{backgroundImage:`url(${uri})`, backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
      <div className='overlay'>
        {loading===true
        ?
        <div className="loading"> Loading ...</div>
        :
        <>
          <div className='addItem'>
            <input className="txtf" type='text' value={task.text} placeholder='Add Task...' onChange={(e)=>{setTask({...task,text:e.target.value})}}/>
            <input className="ddf" type='date' value={task.deadline} placeholder='Add Due Date' onChange={(e)=>setTask({...task,deadline:e.target.value})}/>
            <button className="addB" onClick={()=>addItem()}> Add Task</button>
          </div>
          <div className='listItems'>
          
            {(items.length!==0?(items.map((item)=>{  
             
              return (<Item key ={item.id} item={item} changeStatus={changeStatus}  deleteItem={deleteItem}/>)
            })):null)}
          </div>
        </>
        }
        
      </div>
     
    </div>
  );
}

export default App;
