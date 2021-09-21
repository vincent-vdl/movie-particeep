import React from 'react';
import PropTypes from 'prop-types';
import styles from './Container.module.css';

function Container({ children, ...props }) {
  return <div className={styles.Container} {...props}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node
};

export default Container;
