import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Item from './item';
import { v4 as uuidv4 } from 'uuid';
import {addToLocal} from './utilitty';
function App() {
  const [items,setItems]=useState([]);
  const [task,setTask]=useState({text:"",dd:"",status:false});
  const [uri,setUri]=useState('https://wallpapercave.com/wp/wp7507589.jpg');
  const [loading,setLoading]=useState(true);

  const addItem=()=>{
    setItems((curi)=>{
      addToLocal([...curi,task]);
      return [...curi,task];
    });
    setTask({text:"",dd:"",status:false});
  
  }

  const changeStatus=(idx)=>{
    let citems=items;
    citems[idx].status=!citems[idx].status;
    setItems((ci)=>{
      return [...citems];
    });
    addToLocal(citems);
  }

  const deleteItem=(idx)=>{
    console.log(items);
    const citems=items.filter((item,index)=>{
      return idx!=index;
    });
    setItems((ci)=>{
      return [...citems];
    });
    console.log(items,citems);
    // console.log(citems);
    addToLocal(citems);
  }
  
  const getPrevTasks= async()=>{
    let tasks= localStorage.getItem('tasks');
    tasks=JSON.parse(tasks);
    if(tasks)setItems([...tasks]);
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

  useEffect(()=>{console.log("update hapendx")},[items]);
  useEffect(()=>{
    setLoading(true);
    
    setTimeout(()=>{
      getPrevTasks();
      setLoading(false);
    },1000);
    
    
  },[]);
  return (
    <div className="App" style={{backgroundImage:`url(${uri})`, backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
      <div className='overlay'>
      {/* <div className="loading"> Loading ...</div> */}
        {loading==true
        ?
        <div className="loading"> Loading ...</div>
        :
        <>
          <div className='addItem'>
            <input className="txtf" type='text' value={task.text} placeholder='Add Task...' onChange={(e)=>{setTask({...task,text:e.target.value})}}/>
            <input className="ddf" type='date' value={task.dd} placeholder='Add Due Date' onChange={(e)=>setTask({...task,dd:e.target.value})}/>
            <button className="addB" onClick={()=>addItem()}> Add Task</button>
          </div>
          <div className='listItems'>
            {/* <Item key={1} text={'HI'} deadline={'19/11/21'} status={false} changeStatus={changeStatus} idx={135} deleteItem={deleteItem}/> */}
            {(items.length!=0?(items.map((item,idx)=>{  
             
              return (<Item key ={`${uuidv4()}`} text={item.text} deadline={item.dd} status={item.status} changeStatus={changeStatus} idx={idx} deleteItem={deleteItem}/>)
            })):null)}
          </div>
        </>
        }
        
      </div>
     
    </div>
  );
}

export default App;
