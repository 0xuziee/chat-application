import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Header/Header";
import MainContent from "../components/Dashboard/MainContent";
import IconSidebar from "../components/Dashboard/IconSidebar";
import "../styles/Dashboard.scss";
const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="dashboard">
        <IconSidebar />
        <Sidebar />
        <div className="dashboard-content">
    <MainContent />
       
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
