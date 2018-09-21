import React from 'react';
import './EmptyCeil.css';
import addUser from '../assets/add_user.svg';

const EmptyCeil = (props) => {
  return (
    <div className='empty-ceil'>
      <button onClick={props.onClick}>
        <img src={addUser} className="ceil-logo-add" alt="ajoutez un utilisateur"/>
      </button>
    </div>
  );
};

export default EmptyCeil;