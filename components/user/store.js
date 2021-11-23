const Model =  require("./model")
const addUser =  (user)=>{
    const myUser =  new Model(user)
    return myUser.save()
}
const listUser = ()=>{
    return Model.find();
}
module.exports = {
    add: addUser,
    list: listUser
}