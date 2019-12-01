import React from 'react';

const BooleanSelectBoxControl = ({label,val,booleanSelectChanged}) => {
    let selectVal = 'true';
    if(!val)
    {
        selectVal = 'false';
    }
    return(
        <div className="form-group row">
            <label className="col-lg-2 col-form-label">{label}</label>
            <div className="col-lg-10">
                <select defaultValue={selectVal} name="enabled" onChange={(evt) => booleanSelectChanged(evt)} className="boolean-box">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
        </div>
    );
}

export default BooleanSelectBoxControl;