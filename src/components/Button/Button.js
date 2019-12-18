import React from "react";
import styles from './Button.module.css';
import cn from "classnames";

const Button = ({children, remove, submit, className, ...other}) => {
  const classNames = cn(
    {  
      [className]: typeof className !== "undefined",
      [styles["button-add"]]: !remove && !submit,
      [styles["button-remove"]]: remove,
      [styles["button-submit"]]: submit,
    }
  );

  return <button className={classNames} {...other}>{children}</button>;
};

export default Button;
