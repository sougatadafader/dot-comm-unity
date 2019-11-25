import React from 'react';
import DependentProfileItem from './DependentProfileItem';

const DependentProfileList = ({dependents}) => {
    return(
        <div className="dependent-list-profile card-ui">
            <h3 className="campaign-page-dependent-list">List Of Dependents</h3>
            <div className="dependent-list-profile-container">
                {
                    dependents.map((dependent,index) =>
                        (<DependentProfileItem key={index} dependent={dependent} />)
                    )
                }
            </div>
        </div>
    );
}

export default DependentProfileList;