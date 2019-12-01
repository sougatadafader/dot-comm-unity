import React from 'react';

const CheckBoxControl = ({label,val,inputChanged}) => {
    
    return(
        <div className="form-group row">
            <label className="col-lg-2 col-form-label">{label}</label>
            <div className="col-lg-10">
                <input type="checkbox" className="form-check-input" name="enabled" defaultValue={val} onChange={(evt) => inputChanged(evt)} />
            </div>
        </div>
    );
}

export default CheckBoxControl;