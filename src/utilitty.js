const addToLocal=(items)=>{
    localStorage.removeItem('tasks');
    localStorage.setItem('tasks',JSON.stringify(items));
}

const addIdtoLocal=(id)=>{
    localStorage.removeItem('id');
    localStorage.setItem('id',JSON.stringify(id));
}
export {
    addIdtoLocal,
    addToLocal
}