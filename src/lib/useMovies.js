import { useEffect, useReducer } from 'react';
import { movies$ } from '../data/movies';

export const CATEGORIES = ['ALL'];

export const reducerType = {
  LOAD_MOVIES: 'LOAD_MOVIES',
  SET_CATEGORY: 'SET_CATEGORY',
  DELETE_MOVIE: 'DELETE_MOVIE',
  SET_STATUS: 'SET_STATUS',
  NEXT_PAGE: 'NEXT_PAGE',
  PREV_PAGE: 'PREV_PAGE',
  SET_PAGINATION: 'SET_PAGINATION'
};

const initState = {
  /* category used in select */
  activeCategory: CATEGORIES[0],
  categories: CATEGORIES,
  /* default complete movie library */
  library: [],
  /* visible movie library */
  activeLibrary: [],
  pagination: 12,
  page: 0
};

function getCategories(library) {
  const categories = ['ALL'];
  library.forEach((movie) => {
    if (!categories.includes(movie.category)) {
      categories.push(movie.category);
    }
  });
  return categories;
}

function getUpdatedMovies({ src, id, sentiment }) {
  const idx = src.findIndex((movie) => movie.id === id);
  const movie = src[idx];
  let likes = movie.likes + (movie.isLiked ? -1 : 1);
  let dislikes = movie.dislikes + (movie.isDisliked ? -1 : 0);
  let isLiked = !movie.isLiked;
  let isDisliked = false;

  if (sentiment === 'dislikes') {
    dislikes = movie.dislikes + (movie.isDisliked ? -1 : 1);
    likes = movie.likes + (movie.isLiked ? -1 : 0);
    isLiked = false;
    isDisliked = !movie.isDisliked;
  }
 
  /* immutable update, strict mode */
  return [
    ...src.slice(0, idx),
    { ...movie, likes, dislikes, isLiked, isDisliked },
    ...src.slice(idx + 1, src.length)
  ];
}

function reducer(state, action) {
  switch (action.type) {
    case reducerType.NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case reducerType.PREV_PAGE:
      return { ...state, page: state.page - 1 };
    case reducerType.DELETE_MOVIE: {
      let updatedLibrary = state.library.filter((movie) => movie.id !== action.id);
      let updatedActive = state.activeLibrary.filter((movie) => movie.id !== action.id);
      const categories = getCategories(updatedLibrary);
      if (updatedActive.length === 0) {
        updatedActive = updatedLibrary;
      }

      return { ...state, library: updatedLibrary, activeLibrary: updatedActive, categories };
    }
    case reducerType.SET_PAGINATION:
      return { ...state, pagination: action.pagination, page: 0 };
    case reducerType.LOAD_MOVIES: {
      /* add status switches, easier */
      const movies = action.library.map((movie) => ({
        ...movie,
        isLiked: false,
        isDisliked: false
      }));

      return {
        ...state,
        library: movies,
        activeLibrary: movies,
        categories: getCategories(action.library)
      };
    }
    case reducerType.SET_CATEGORY:
      return {
        ...state,
        activeCategory: action.category,
        activeLibrary:
          action.category === 'ALL'
            ? state.library
            : state.library.filter((movie) => movie.category === action.category)
      };
    case reducerType.SET_STATUS: {
      const { id, sentiment } = action;
      const library = getUpdatedMovies({ src: state.library, sentiment, id });
      const activeLibrary = getUpdatedMovies({ src: state.activeLibrary, sentiment, id });
      return { ...state, library, activeLibrary };
    }
    default:
      return state;
  }
}

function useMovies() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const fetch = async () => {
      const resp = await Promise.resolve(movies$);
      dispatch({ type: reducerType.LOAD_MOVIES, library: resp });
    };
    fetch();
  }, []);

  return { state, dispatch };
}

export default useMovies;
