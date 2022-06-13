import FilmsPresenter from './presenter/films-presenter';
import MovieModel from './model/movies-model';
import CommentModel from './model/comments-model';
import { MOVIES_COUNT } from './constants';
import UserPresenter from './presenter/user-presenter';
import MainNavigationPresenter from './presenter/main-navigation-presenter';
import FooterPresenter from './presenter/footer-presenter';
import SortModel from './model/sort-model';
import SortPresenter from './presenter/sort-presenter';
import FilterModel from './model/filter-model';

import {getRandomNumber} from './helpers';

const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const moviesModel = new MovieModel(MOVIES_COUNT);
const commentsModel = new CommentModel();
const sortModel = new SortModel();
const filterModel = new FilterModel();

const films = new FilmsPresenter(mainElement, moviesModel, commentsModel, sortModel, filterModel);
const profile = new UserPresenter(moviesModel);
const navigation = new MainNavigationPresenter(moviesModel, filterModel, mainElement);
const footer = new FooterPresenter(getRandomNumber(0, 1000000), footerElement);
const sort = new SortPresenter(mainElement, sortModel);

films.init();
profile.init();
navigation.init();
footer.init();
sort.init();
