import { render } from './render.js';
import Sort from './view/sort';
import FilmsPresenter from './presenter/films';
import MovieModel from './model/movie';
import CommentModel from './model/comment';
import { MOVIES_COUNT } from './constants';
import UserModel from './model/user';
import UserPresenter from './presenter/user';
import MainNavigationPresenter from './presenter/main-navigation';
import FooterPresenter from './presenter/footer';

import {getRandomNumber} from './helpers';

const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const moviesModel = new MovieModel(MOVIES_COUNT);
const commentsModel = new CommentModel();
const films = new FilmsPresenter(mainElement, moviesModel, commentsModel);
const user = new UserModel();
const profile = new UserPresenter(user);
const navigation = new MainNavigationPresenter(user, mainElement);
const footer = new FooterPresenter(getRandomNumber(0, 1000000), footerElement);

render(new Sort(), mainElement);
films.init();
profile.init();
navigation.init();
footer.init();
