import React from "react";
import AppNav from "../../components/appNav/AppNav";
import styles from "./AppLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import User from "../../components/User/User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
