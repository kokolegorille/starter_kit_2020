import React from "react";

import signinSchema from "../schemas/signin_schema";

import Form from "../components/form";
import MenuIcon from "../components/menu_icon";
import Joystick from "../components/joystick";
import TreeProperties from "../components/tree_properties";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <h2>Sample Form</h2>
      <Form
        schema={signinSchema}
        callback={(params) => console.log(params)}
        handleCancel={() => console.log("Cancel")}
        resetOnSubmit={true} />
      <h2>Sample Menu Icon</h2>
      <MenuIcon callback={() => console.log("Clicked!")} />
      <h2>Sample Joystick</h2>
      <Joystick
        callback={
          ({forward, turn}) => console.log(`Moved: ${forward} ${turn}`)
        }
      />
      <h2>Sample Tree Properties</h2>
      <TreeProperties object={signinSchema} />
    </>
  );
};

export default Home;
