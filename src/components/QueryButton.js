import React from 'react';

const QueryButton = ({handleClick}) => {
  const clicked = (e)=> { 
    e.preventDefault(); 
    handleClick();
  }

  return ( 
    <button onClick={ clicked } className="btn-query"> CLICK TO UPDATE SCHEDULE DISPLAY </button> 
  )
}
export default QueryButton;