import React,{ Component } from 'react';
import { useHistory } from 'react-router-dom';

function UserDash() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
    const history=useHistory();
  function logOut()
  {
      localStorage.clear();
      history.push('/');
  }
    return (
     <div>
         <h1>Hello User</h1>
         <button  onClick={logOut}>Logout</button>
     </div>
    );
  }
  export default UserDash;


  