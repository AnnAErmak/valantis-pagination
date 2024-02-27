import React from 'react';
import styles from './style.module.css';

const Loader = ({
  active,
  children
}) => {
  if (active) {
    return <div className={styles.ldsHeart}>
      <div></div>
    </div>;
  } else {
    return children;
  }

};

export default Loader;
