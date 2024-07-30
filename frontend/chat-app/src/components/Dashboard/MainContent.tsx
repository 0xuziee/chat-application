// import { useNavigation } from 'react-router-dom';
import React from "react";
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import "../../styles/MainContent.scss";

const MainContent: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handlesignOut = () => {
    signOut();
    
    navigate("/signin");
    window.location.reload();
  };
  return (
    <div className="main-content">
        <div className="pic"> 
            <img src="/dash-image1.png" alt="dash" />
  
        </div>
      <h1>Pulse</h1>
      <p>Connect, Communicate, Create</p>
      <p>Your journey with pulse begins here!</p>
    
      <button onClick={handlesignOut}>sign out</button>
    </div>
  );
};

export default MainContent;
