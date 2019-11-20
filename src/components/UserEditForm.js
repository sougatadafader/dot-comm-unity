import React from 'react';
import InputControl from './InputControl';
const UserEditForm = ({user,inputChanged}) => {
    return(
        <div className="user-edit-card card-ui">
            <h3 className="user-edit-title">Edit User Form</h3>
            <form>
                <InputControl 
                    label="First Name"
                    type="text"
                    name="firstName"
                    val=""
                    placeholder="First Name"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="Last Name"
                    type="text"
                    name="lastName"
                    val=""
                    placeholder="Last Name"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="Password"
                    type="password"
                    name="password"
                    val=""
                    placeholder="******"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="Image URL"
                    type="text"
                    name="imageUrl"
                    val=""
                    placeholder="Image Url"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="Email"
                    type="email"
                    name="email"
                    val=""
                    placeholder="Email"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="About Me"
                    type="textarea"
                    name="aboutMe"
                    val=""
                    placeholder="About Me"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <button type="submit" className="btn btn-primary">Edit Profile</button>
            </form>
        </div>
    );
}

export default UserEditForm;