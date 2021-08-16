import React, {useState} from "react";
import './MoviesApp.css';
import Movie from "../components/Movie";
import SearchBar from "../components/SearchBar";
import SearchService, {SearchResult} from "../services/Search";

function MoviesApp() {
    const searchService = new SearchService();
    const [movieResults, setMovieResults] = useState({
        results: [],
        page: 0,
        total_results: 0,
        total_pages: 0,
        searchTerm: undefined
    } as SearchResult)

    const sub = searchService.results$.subscribe((next) => {
        setMovieResults(next);
    });

    function clickMore() {
        searchService.search(movieResults.searchTerm || '', movieResults.page + 1);
    }

    function clickPrevious() {
        return searchService.search(movieResults.searchTerm || '', movieResults.page - 1);
    }


    return <React.Fragment>
        <section className={'container-fluid'}><SearchBar searchService={searchService}/></section>
        <main className={'container-fluid'}>
            <section className={''}>
                <div className={''}>
                    {movieResults.results.map(each => <Movie key={each.id} {...each}/>)}
                </div>
                <div className={'mb-1'}>
                    {(movieResults.page > 1) && <input
                      type={'button'}
                      className={'d-block mx-auto'}
                      value={'Previous Results'}
                      onClick={clickPrevious}
                    />}
                    {(movieResults.total_pages > movieResults.page) && <input
                      type={'button'}
                      className={'d-block mx-auto'}
                      value={'More Results'}
                      onClick={clickMore}
                    />}
                </div>
            </section>
        </main>
    </React.Fragment>
}

export default MoviesApp;
