import React from 'react';
import InputControl from './InputControl';
const UserEditForm = ({user,inputChanged,submitEditProfile}) => {
    return(
        <div className="user-edit-card card-ui">
            <h3 className="user-edit-title">Edit User Form</h3>
            <form onSubmit={(evt) => submitEditProfile(evt)}>
                <InputControl 
                    label="First Name"
                    type="text"
                    name="firstName"
                    val={user.firstName}
                    placeholder="First Name"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="Last Name"
                    type="text"
                    name="lastName"
                    val={user.lastName}
                    placeholder="Last Name"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="Password"
                    type="password"
                    name="password"
                    val={user.password}
                    placeholder="******"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="Image URL"
                    type="text"
                    name="imageUrl"
                    val={user.imageUrl}
                    placeholder="Image Url"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="Email"
                    type="email"
                    name="email"
                    val={user.email}
                    placeholder="Email"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <InputControl 
                    label="About Me"
                    type="textarea"
                    name="aboutMe"
                    val={user.aboutMe}
                    placeholder="About Me"
                    inputChanged={(evt) => inputChanged(evt)}
                />
                <button type="submit" className="btn btn-primary" style={{marginTop:'20px'}}>Edit Profile</button>
            </form>
        </div>
    );
}

export default UserEditForm;