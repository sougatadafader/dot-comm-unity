import React from 'react';

const DropDownControl = ({name,title,val,values,info,refreshList,loadingList}) => {
    if(loadingList)
    {
        return(
            <select className="form-control" name={name} required>
                <option value="">Loading {title}...</option>
            </select>
        );
    }
    else if(values.length > 0)
    {
        return(
            <select className="form-control" defaultValue={val} name={name}>
                <option value="">Select a {title}</option>
            {
                values.map((value,index)=>
                    (<option key={index} value={value.value}>{value.displayText}</option>)
                )
            }
        </select>
        );
    }
    return(
        <select className="form-control" defaultValue={val} name={name}>
            <option value="">No {title} found</option>
        </select>
    );
}

export default DropDownControl;