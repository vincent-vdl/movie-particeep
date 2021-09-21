import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

function Card({ title, subTitle, onClose = () => {}, children }) {
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={styles.Card}>
      <span title="Supprimer" className={styles.CardClose} onClick={handleCloseClick}>[X]</span>
      <h3>{title}</h3>
      <p>{subTitle}</p>
      {children}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node
};

export default Card;
