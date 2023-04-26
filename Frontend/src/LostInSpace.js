import './css/LostInSpace.css';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader';
import LostInSpaceIcon from './css/lostinspace.png';

function LostInSpace() {

    function FireBack() {
        window.history.back();
      }

    return (
        <>
        <div className="feedback">
          <div className="feedback-form">
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='feedback-title'>Lost in Space</div>

            <div className="feedback-menu-displaydata">
                <img src={LostInSpaceIcon} className="feedback-menu-displaydata-icon"/>
            </div>

          </div>

        </div>
       
            <EmployeeHeader/>
        </>
     
    )
}

export default LostInSpace;