import React from 'react';
import SkeletonPart from './SkeletonPart';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-ui">
                            <SkeletonPart />
                        </div>
                        <div className="card-ui">
                            <SkeletonPart />
                        </div>
                        <div className="card-ui">
                            <SkeletonPart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loading;