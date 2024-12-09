import React, { useState } from "react";

const BandRegister = () => {
  const [box1, setBox1] = useState(true);
  const [box2, setBox2] = useState(false);

  const registerBand = () => {};
  return (
    <div>
      <div>
        <form action="">
          <label htmlFor="">Email :</label>
          <input type="text" placeholder="Enter email" />
          <label htmlFor="">Add a password :</label>
          <input type="password" placeholder="Password" />
          <div>{/* <button onClick={() => }>Next</button> */}</div>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default BandRegister;
