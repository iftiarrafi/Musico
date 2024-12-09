import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const Privateband = () => {
  const [ok, setOk] = useState(false);
  const { band } = useSelector((state) => state.auth);
  useEffect(() => {
    if (band) {
      setOk(true);
    }
  }, [band]);
  return ok ? (
    <Outlet />
  ) : (
    <>
      <h2>Not authorized</h2>
    </>
  );
};

export default Privateband;
