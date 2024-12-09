import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const PrivateAdmin = () => {
  const [ok, setOk] = useState(false);
  const { admin } = useSelector((state) => state.adminLogin);
  useEffect(() => {
    if (admin) {
      setOk(true);
    }
  }, [admin]);

  return ok ? <Outlet /> : <h2>Not authorized</h2>;
};

export default PrivateAdmin;
