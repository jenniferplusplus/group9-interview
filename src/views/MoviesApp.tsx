import React from "react";
import {useObservable} from "rxjs-hooks";
import './MoviesApp.css';
import Movie from "../components/Movie";
import SearchBar from "../components/SearchBar";
import SearchService, {SearchResult} from "../services/Search";

function MoviesApp() {
    const searchService = new SearchService();
    const results: SearchResult = useObservable(() => searchService.results$, {
        results: [],
        page: 0,
        total_results: 0,
        total_pages: 0
    })

    return <React.Fragment>
        <section className={'container-fluid'}><SearchBar searchService={searchService}/></section>
        <main className={'container-fluid'}>
            <section className={''}>
                <div className={''}>
                    {results.results.map(each => <Movie {...each}/>)}
                </div>
            </section>
        </main>
    </React.Fragment>
}

export default MoviesApp;
