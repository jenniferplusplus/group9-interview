import React from "react";
import {useObservable} from "rxjs-hooks";
import './MoviesApp.css';
import Movie from "./components/Movie";
import SearchBar from "./components/SearchBar";
import SearchService from "./services/Search";

function MoviesApp() {
    const searchService = new SearchService();
    const results: {results: Array<{id: number, title: string}>} = useObservable(() => searchService.results$, {results: []})

    return <React.Fragment>
        <section className={'container-fluid'}><SearchBar searchService={searchService}/></section>
        <main className={'container-fluid'}>
            <section className={'row px-2'}>
                <div className={'col d-grid gap-2'}>
                    {results.results.map(each => <Movie {...each}/>)}
                </div>
            </section>
        </main>
    </React.Fragment>
}

export default MoviesApp;
