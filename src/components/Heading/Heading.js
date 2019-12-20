import React from 'react';
import style from './Heading.module.css'; 
import star from '../../img/logo.svg';
import santa from '../../img/santa1.png'

const Heading = () => {
  return(
    <div>
      <h1 className={style.secret_santa}>-Secret Santa-</h1>
      <img src={star} className={style.image_star} alt='star' />
      <p className={style.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et pellentesque elit. Pellentesque non mattis sapien. Ut est velit, commodo.</p>
      <img src={santa} className={style.image_santa} alt='santa' />
    </div>
  );
}

export default Heading;