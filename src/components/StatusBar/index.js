import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatusBar.module.css';

function StatusBar({ likes = 0, dislikes = 0, onLike = () => {}, onDislike = () => {} }) {
  const sample = (likes + dislikes) || 1;
  const likesBar = (likes / sample) * 100;

  const handleLikeClick = () => {
    onLike();
  };

  const handleDislikeClick = () => {
    onDislike();
  };

  return (
    <div className={styles.StatusBarContainer}>
      <div className={styles.StatusBarIndices}>
        <p onClick={handleLikeClick}>{likes}&uArr;</p>
        <p onClick={handleDislikeClick}>{dislikes}&dArr;</p>
      </div>
      <div className={styles.StatusBar}>
        <span className={styles.LikeBar} style={{ width: ` ${likesBar}%`}} />
      </div>
    </div>
  );
}

StatusBar.propTypes = {
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
};

export default StatusBar;
