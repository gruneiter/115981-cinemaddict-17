import FilmsPresenter from './presenter/films-presenter';
import MovieModel from './model/movies-model';
import CommentModel from './model/comments-model';
import UserPresenter from './presenter/user-presenter';
import MainNavigationPresenter from './presenter/main-navigation-presenter';
import FooterPresenter from './presenter/footer-presenter';
import SortModel from './model/sort-model';
import SortPresenter from './presenter/sort-presenter';
import FilterModel from './model/filter-model';

import MoviesApiService from './movies-api-service.js';

const AUTHORIZATION = 'Basic MzjPWWRdmAVwhJuz';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const moviesModel = new MovieModel(new MoviesApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentModel(new MoviesApiService(END_POINT, AUTHORIZATION));
const sortModel = new SortModel();
const filterModel = new FilterModel();

const films = new FilmsPresenter(mainElement, moviesModel, commentsModel, sortModel, filterModel);
const profile = new UserPresenter(moviesModel);
const navigation = new MainNavigationPresenter(moviesModel, filterModel, mainElement);
const footer = new FooterPresenter(moviesModel, footerElement);
const sort = new SortPresenter(mainElement, sortModel);

films.init();
profile.init();
navigation.init();
footer.init();
sort.init();
moviesModel.init();
