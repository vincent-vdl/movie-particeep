import React from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import MoviesLayout from './layout/MoviesLayout';
import useMovies, { reducerType } from './lib/useMovies';
import Card from './components/Card';
import Container from './components/Container';
import StatusBar from './components/StatusBar';
import styles from './App.module.css';

function App() {
  const { state, dispatch } = useMovies();

  const start = state.page * state.pagination;
  const end = state.page * state.pagination + state.pagination;
  const libraryLength = state.activeLibrary.length;

  const handlePaginationChange = (event) => {
    dispatch({ type: reducerType.SET_PAGINATION, pagination: parseInt(event.target.value, 10) });
  };

  const handleLikeMovie = (id) => {
    dispatch({ type: reducerType.SET_STATUS, sentiment: 'likes', id });
  };

  const handleDislikeMovie = (id) => {
    dispatch({ type: reducerType.SET_STATUS, sentiment: 'dislikes', id });
  };
  
  const handleCategoryChange = (event) => {
    dispatch({ type: reducerType.SET_CATEGORY, category: event.target.value });
  };

  const handleCardDelete = (id) => {
    dispatch({ type: reducerType.DELETE_MOVIE, id });
  };

  const handleNextPage = () => {
    dispatch({ type: reducerType.NEXT_PAGE });
  };

  const handlePrevPage = () => {
    dispatch({ type: reducerType.PREV_PAGE });
  };

  return (
    <div className="App">
      <Container>
        <header className={styles.AppHeader}>
          <select value={state.pagination} onChange={handlePaginationChange} label="t">
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
          <select value={state.activeCategory} onChange={handleCategoryChange}>
            {state.categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button disabled={start <= 0 } onClick={handlePrevPage}>Précédent</button>
          <button disabled={end >= libraryLength} onClick={handleNextPage}>Suivant</button>
        </header>
      </Container>
      <MoviesLayout>
        <AnimateSharedLayout>
          {state.activeLibrary.slice(start, end).map((movie) => (
            <motion.div key={movie.id} layout>
              <Container>
                <Card
                  title={movie.title}
                  subTitle={movie.category}
                  onClose={() => handleCardDelete(movie.id)}
                >
                  <StatusBar
                    likes={movie.likes}
                    dislikes={movie.dislikes}
                    onLike={() => handleLikeMovie(movie.id)}
                    onDislike={() => handleDislikeMovie(movie.id)}
                  />
                </Card>
              </Container>
            </motion.div>
          ))}
        </AnimateSharedLayout>
      </MoviesLayout>
    </div>
  );
}

export default App;
