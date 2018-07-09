import React from 'react';

const DrivingWith = ({ drivingDriver }) => {
  return (
    <div className="row center">
      <div className="card-panel">
        <span className="blue-text text-darken-2">
          You are driving with Driver {drivingDriver.name} ...
        </span>
      </div>
    </div>
  );
};

export default DrivingWith;
