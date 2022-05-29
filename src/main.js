import { render } from './render.js';
import Sort from './view/sort';
import FooterStatistics from './view/footer-statistics';
import FilmsPresenter from './presenter/films';
import MovieModel from './model/movie';
import CommentModel from './model/comment';
import { MOVIES_COUNT } from './constants';
import UserModel from './model/user';
import UserPresenter from './presenter/user';
import MainNavigationPresenter from './presenter/main-navigation';

const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const moviesModel = new MovieModel(MOVIES_COUNT);
const commentsModel = new CommentModel();
const films = new FilmsPresenter(mainElement, moviesModel, commentsModel);
const user = new UserModel();
const profile = new UserPresenter(user);
const navigation = new MainNavigationPresenter(user, mainElement);

render(new Sort(), mainElement);
render(new FooterStatistics(), footerElement);
films.init();
profile.init();
navigation.init();
