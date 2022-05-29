import { render } from './render.js';
import Profile from './view/profile';
import MainNavigation from './view/main-navigation';
import Sort from './view/sort';
import FooterStatistics from './view/footer-statistics';
import FilmsPresenter from './presenter/films';
import MovieModel from './model/movie';
import CommentModel from './model/comment';
import { MOVIES_COUNT } from './constants';

const mainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const moviesModel = new MovieModel(MOVIES_COUNT);
const commentsModel = new CommentModel();
const films = new FilmsPresenter(mainElement, moviesModel, commentsModel);

render(new Profile(), headerElement);
render(new MainNavigation(), mainElement);
render(new Sort(), mainElement);
render(new FooterStatistics(), footerElement);
films.init();
