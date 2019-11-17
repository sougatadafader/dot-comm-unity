import React from 'react';

const DropDownControl = ({name,title,val,values,info,refreshList,loadingList}) => {
    if(loadingList)
    {
        return(
            <div className="form-group row">
                <label className="col-lg-2 col-form-label">{title}</label>
                <div className="col-lg-10">
                    <select className="form-control" name={name} required>
                        <option value="">Loading {title}...</option>
                    </select>
                </div>
            </div>
        );
    }
    else if(values.length > 0)
    {
        return(
            <div className="form-group row">
                <label className="col-lg-2 col-form-label">{title}</label>
                <div className="col-lg-10">
                    <select className="form-control" defaultValue={val} name={name}>
                        <option value="">Select a {title}</option>
                        {
                            values.map((value,index)=>
                            (<option key={index} value={value.value}>{value.displayText}</option>)
                            )
                        }
                    </select>
                </div>
            </div>
        );
    }
    return(
        <div className="form-group row">
            <label className="col-lg-2 col-form-label">{title}</label>
            <div className="col-lg-10">
                <select className="form-control" defaultValue={val} name={name}>
                    <option value="">No {title} found</option>
                </select>
            </div>
        </div>
    );
}

export default DropDownControl;