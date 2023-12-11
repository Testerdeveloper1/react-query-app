import { useState } from "react"
function DerivedState() {
    const [users, setUsers] = useState([
      { id: 1, name: "Kyle" },
      { id: 2, name: "John" },
    ])
    const [selectedUserId,setSelectedUserId] = useState();
    const selectedUser = users.find(user=>user.id === selectedUserId);
    
    function updateUser(id:number, name:string) {
        setUsers(prevUsers => {
          const newUsers = [...prevUsers]
          const user = newUsers.find(user => user.id === id)
          user.name = name
          return newUsers
        })
      }
    
      return users.map(user => user.name).join(", ")
    
    
}

export default DerivedState