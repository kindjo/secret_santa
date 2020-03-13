import React from 'react';
import { Field } from 'redux-form';
import styles from './Input.module.css';
import cn from "classnames";

let Input = (props) => <Field component={renderField} {...props} />;

const renderField = ({input, meta, type, className, showLabel=false, style, ...other}) => {
  const {touched, invalid, error} = meta;
  let output;

  const classNames = cn(
    {
      [className]: typeof className !== "undefined",
      [styles["invalid"]]: touched && invalid
    }
  );

  switch (type) {
    case "text":
      output = <input {...input} type="text" className={classNames} {...other} />;
      break;
    case "textarea":
      output = <textarea {...input} className={classNames} {...other} />;
      break;
    case "number":
      output = <input {...input} type="number" className={classNames} {...other} />;
      break;
    default:
      output = <input {...input} type="text" className={classNames} {...other} />;
  }

  return (
    <div className={styles["input"]} style={style}>
      {showLabel && input.value && other.placeholder && <label>{other.placeholder}</label>}
      {output}
      {touched && error ?
        <span className={styles["subtext"]}>{error}</span>
      : null}
    </div>
  );
};

export default Input;
