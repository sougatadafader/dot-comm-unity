import React from 'react';

const InputControl = ({type,label,name,placeholder,val,inputChanged}) => {
    return(
        <div className="form-group row">
            <label className="col-lg-2 col-form-label">{label}</label>
            <div className="col-lg-10">
                {
                    type==='textarea'?(<textarea name={name} className="form-control" placeholder={placeholder} defaultValue={val} onChange={(evt) => inputChanged(evt)} required></textarea>):(<input type={type} name={name} className="form-control" placeholder={placeholder} defaultValue={val} onChange={(evt) => inputChanged(evt)} required />)
                }
            </div>
        </div>
    );
}

export default InputControl;