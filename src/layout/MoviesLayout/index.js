import React from 'react';
import PropTypes from 'prop-types';
import styles from './MoviesLayout.module.css';

function MoviesLayout({ children }) {
  return (
    <div className={styles.MoviesLayout}>
      {children}
    </div>
  );
}

MoviesLayout.propTypes = {
  children: PropTypes.node
};

export default MoviesLayout;    
