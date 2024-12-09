import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const Privateuser = () => {
  const [ok, setOk] = useState(false);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      setOk(true);
    }
  }, [user]);
  return ok ? (
    <Outlet />
  ) : (
    <>
      <h2>not authorized</h2>
    </>
  );
};

export default Privateuser;
