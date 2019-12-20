import React from "react";
import styles from './Input.module.css';

const Input = ({...other}) => {
  return <input className={styles.input} type='text' {...other} />;
};

export default Input;
