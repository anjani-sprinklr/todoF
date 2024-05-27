interface Item{
    id:string,
    text: string;
    deadline: string;
    status: boolean;
  
  }

const addToLocal=(items:Item[])=>{
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks',JSON.stringify(items));
}


export {
    addToLocal
}