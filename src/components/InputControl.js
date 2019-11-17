import React from 'react';

const InputControl = ({type,label,name,placeholder,val,inputChanged}) => {
    return(
        <div className="form-group row">
            <label className="col-lg-2 col-form-label">{label}</label>
            <div className="col-lg-10">
                <input type={type} name={name} className="form-control" placeholder={placeholder} defaultValue={val} onChange={() => inputChanged(event)} required />
            </div>
        </div>
    );
}

export default InputControl;