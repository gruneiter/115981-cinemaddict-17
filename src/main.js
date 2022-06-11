import FilmsPresenter from './presenter/films-presenter';
import MovieModel from './model/movies-model';
import CommentModel from './model/comments-model';
import { MOVIES_COUNT } from './constants';
import UserModel from './model/user-model';
import UserPresenter from './presenter/user-presenter';
import MainNavigationPresenter from './presenter/main-navigation-presenter';
import FooterPresenter from './presenter/footer-presenter';

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

films.init();
profile.init();
navigation.init();
footer.init();
