import React from 'react';

import MenuIcon from '../components/menu_icon';
import Joystick from '../components/joystick';

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <MenuIcon callback={() => console.log("Clicked!")} />
      <Joystick callback={() => console.log("Moved!")} />
    </>
  );
};

export default Home;
