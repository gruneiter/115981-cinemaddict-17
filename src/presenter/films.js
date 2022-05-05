import Films from '../view/films';
import FilmCard from '../view/film-card';
import FilmsList from '../view/films-list';
import ShowMore from '../view/show-more';

import { render } from '../render.js';

const CARD_COUNT = 5;

export default class FilmsPresenter {
  main = new Films();
  allMovies = new FilmsList({ name: 'All movies. Upcoming', hidden: true });
  topRated = new FilmsList({ name: 'Top rated' }, true);
  mostCommented = new FilmsList({ name: 'Most commented' }, true);


  init = (mainContainer) => {
    this.mainContainer = mainContainer;
    render(this.main, this.mainContainer);
    render(this.allMovies, this.main.getElement());
    render(new ShowMore(), this.allMovies.getElement());
    render(this.topRated, this.main.getElement());
    render(this.mostCommented, this.main.getElement());
    const filmsDivElement = document.querySelectorAll('.films-list__container');
    for (let i = 0; i < CARD_COUNT; i++) {
      render(new FilmCard(), filmsDivElement[0]);
    }
    render(new FilmCard(), filmsDivElement[1]);
    render(new FilmCard(), filmsDivElement[2]);
  };
}
