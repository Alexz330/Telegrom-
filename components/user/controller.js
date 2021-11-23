const store =  require('./store')

const addUser = (name)=>{
    
    if(!name){
        return Promise.reject("Invalid name");
    }
    const user = {
        name,
    };
    return store.add(user)
}

const listUser=()=>{
    return store.list()
}
module.exports = {
    addUser,
    listUser
}