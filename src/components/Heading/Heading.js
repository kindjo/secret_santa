import React from 'react';
import style from './Heading.module.css'; 
import star from '../../img/zvezdica.svg';

const Heading = () => {
  const value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et pellentesque elit. Pellentesque non mattis sapien. Ut est velit, commodo.";
  
  return(
    <div className={style.santa}>
      <h1 className={style.headline}>-Secret Santa-</h1>
      <img src={star} className={style.image_star} alt='star' />
      <p className={style.santa_text}>{value}</p>
    </div>
  );
}

export default Heading;
