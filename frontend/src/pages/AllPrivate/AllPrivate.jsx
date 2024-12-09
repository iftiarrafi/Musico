import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const AllPrivate = () => {
  const { band } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);
  useState(() => {
    if (band || user) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [band, user]);
  return ok ? (
    <Outlet />
  ) : (
    <>
      <h2>You Must Log in</h2>
    </>
  );
};

export default AllPrivate;
