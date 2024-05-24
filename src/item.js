import React, { useEffect, useState } from "react";
import './App.css';
const Item=({text,deadline,status,idx,changeStatus,deleteItem})=>{
    const [sttus,setStatus]=useState(status);
    let elem=null;
    useEffect(()=>{
        console.log(text,deadline,status);
    },[]);
    const addTootltip=(e)=>{
        // console.log(e.target);
        let elem=document.createElement("div");
        elem.setAttribute("id","tooltip");
        elem.innerHTML="Delete this Task";
        document.body.append(elem);

        // place it
        let coordElem=e.target.getBoundingClientRect();

        let left = coordElem.left + (e.target.offsetWidth-elem.offsetWidth)/2;
        let top = coordElem.top -20 ;
        elem.style.left=left+"px";
        elem.style.top=top+"px";
        console.log(elem);

    }
    const deleteTooltip=(e)=>{
        console.log("hi del");
        // e.target.remove();
        const ele=document.getElementById("tooltip");
        if(ele!=null)ele.remove();
        
    }
    const toggleStatus=()=>{
        setStatus(!sttus);
        changeStatus(idx);

    }
    return (
        <div className="item">
            <div className="txts">{text}</div>
            <div className="dd" style={{backgroundColor:sttus?'rgba(101, 246, 111, 0.474)':'rgba(246, 101, 101, 0.474)'}}>{deadline}</div>
            <div className="status" >
                <input type="checkbox" checked={sttus} onChange={()=>{toggleStatus();}} />
                <button className="delB" onMouseOver={(e)=>addTootltip(e)}  onMouseOut={(e)=>deleteTooltip(e)} onClick={(e)=>{deleteTooltip(e);deleteItem(idx)}}>X</button>
            </div>
        </div>
    );
}

export default Item;