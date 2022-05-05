import { render } from './render.js';
import Profile from './view/profile';
import MainNavigation from './view/main-navigation';
import Sort from './view/sort';
import FooterStatistics from './view/footer-statistics';
import FilmsPresenter from './presenter/films';
import FilmDetails from './view/film-details';

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const body = document.querySelector('body');
const films = new FilmsPresenter;

render(new Profile(), header);
render(new MainNavigation(), main);
render(new Sort(), main);
render(new FooterStatistics(), footer);
render(new FilmDetails(), body);
films.init(main);
