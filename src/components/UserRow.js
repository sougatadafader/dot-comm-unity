import React from 'react'

const UserRow = ({user, deleteUser, selectUser, selectedUser, editUser}) =>

    <tr className={(selectedUser===user) ? 'bg-primary text-light': ''} id={user.id} onClick={() => selectUser(user)}>
        {console.log(user)}
        <th scope="row" >{user.id}</th>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>
            <select disabled={user.userRole==='admin'}>
                <option value={user.userRole}>{user.userRole}</option>
                <option value={(user.userRole==='admin'? "user": "admin")}>{(user.userRole==='admin'? "user": "admin")}</option>
            </select>

        </td>
        <td>
            <button onClick={() => editUser(user)} className="btn fa fa-pencil " disabled={user.userRole==='admin'}>
            </button>
            <button onClick={() => deleteUser(user)} className="btn fa fa-trash  ml-2" disabled={user.userRole==='admin'}>
            </button>
        </td>
    </tr>


export default UserRow