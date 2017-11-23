

// add username(id name room)
// remove username
// get username
// get user list


// Class Declaration

class Users{
  constructor() {
    this.users=[];
  }
  addUser(id,name,room) {
    var user ={id,name,room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    // return user that was removed
    // First Check whether user id exist or not by calling getUser function
    // if user exist , update the array by creating the new array with the same name and
    // condition will be aa all the users whoes id is not equal to the remove(id)
    var user = this.getUser(id);
    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  getUser(id){
    // return user object whoes id matches the object id
    // As there will only one user so index 0
    return this.users.filter((user) => user.id === id)[0]

  }

  getUserList(room) {
    // All the people in the same room
    var users = this.users.filter((user)=> user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports ={Users};
