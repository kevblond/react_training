import React from 'react';
import './Ceil.css';
import logoUser from '../assets/logo_user.svg';

const Ceil = ({firstName, lastName, email}) => {
  return (
    <div className='ceil'>
      <div className='first-line-ceil'>
        <img src={logoUser} className="ceil-logo" alt="bla"/>
        <p>{firstName} {lastName}</p>
      </div>
      <div className='second-line-ceil'>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Ceil;