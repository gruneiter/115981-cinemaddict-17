import { render } from './render.js';
import Profile from './view/profile';
import MainNavigation from './view/main-navigation';
import Sort from './view/sort';
import FooterStatistics from './view/footer-statistics';
import FilmsPresenter from './presenter/films';
import MovieModel from './model/movie';
import { MOVIES_COUNT } from './constants';

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const moviesModel = new MovieModel(MOVIES_COUNT);
const films = new FilmsPresenter(main, moviesModel);

render(new Profile(), header);
render(new MainNavigation(), main);
render(new Sort(), main);
render(new FooterStatistics(), footer);
films.init();
