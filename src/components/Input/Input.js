import React from "react";
import './Input.css';

const Input = ({className, ...other}) => {
  return <input className={className} type='text' {...other} />;
};

export default Input;
