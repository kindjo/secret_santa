import React from "react";
import styles from './Button.module.css';
import cn from "classnames";

const Button = ({children, remove, submit, disabled, className, ...other}) => {
  const classNames = cn(
    {  
      [className]: typeof className !== "undefined",
      [styles["button-add"]]: !remove && !submit && !disabled,
      [styles["button-remove"]]: remove,
      [styles["button-submit"]]: submit,
      [styles["button-disabled"]]: disabled,
    }
  );

  return <button className={classNames} {...other}>{children}</button>;
};

export default Button;
