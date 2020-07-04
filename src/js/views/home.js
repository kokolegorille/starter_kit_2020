import React from "react";

import signinSchema from "../schemas/signin_schema";

import { Form, Fieldset, Field, Submit } from "../components/form_builder";
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
        initialState={{}}
        errors={{}}
        resetOnSubmit={true}>
        <Fieldset legend="Sign In">
          <Field 
            name="name" 
            label="Name" 
            validationRules={{notEmpty: true}}
            required={true}
            type="text" 
            placeholder="Name" />
          <Field 
            name="password" 
            label="Password" 
            validationRules={{minLength: 6}}
            required={true}
            type="password" 
            placeholder="Password" />
        </Fieldset>
        <Submit label="Submit" />
      </Form>
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
