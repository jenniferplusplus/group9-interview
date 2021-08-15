import StarRating from "../StarRating";
import {SearchEntry} from "../../services/Search";
import './Movie.css'

function Movie(props: SearchEntry) {
  const imgBaseUrl = 'https://image.tmdb.org/t/p/';
  const imgSize = 'w154';

  const year = new Date(props.release_date).getFullYear();
  return <article className={'row mx-2 mb-4 mb-md-2'}>
    <div className={'col-2 px-0'}>
      {/*TODO: Placeholder graphics for missing images*/}
      {props.poster_path && <img
          src={`${imgBaseUrl}${imgSize}${props.poster_path}`}
          alt={`Movie poster for ${props.title}`}
          className={'img-fluid img-thumbnail d-block mx-auto'}/>}
    </div>
    <div className={'col'}>
      <div><span><strong>{props.title}</strong></span> <span>({year})</span></div>
      <div><p className={'mb-1'}>{props.overview}</p></div>
      <div><StarRating average={props.vote_average} count={props.vote_count}/></div>
    </div>
  </article>
}

export default Movie;
