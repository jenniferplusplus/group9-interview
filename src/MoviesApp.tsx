import React from "react";
import {useObservable} from "rxjs-hooks";
import './MoviesApp.css';
import Movie from "./components/Movie";
import SearchForm from "./components/SearchForm";
import SearchService from "./services/Search";

function MoviesApp() {
    const searchService = new SearchService();
    const results: {results: Array<{id: number, title: string}>} = useObservable(() => searchService.results$, {results: []})

    return <main className={'container-lg'}>
        <section className={'row'}><div className={'col g'}>
            <SearchForm searchService={searchService}/>
        </div></section>
        <section className={'row'}><div className={'col g'}>
            {results.results.map(each => <Movie {...each}/>)}
        </div></section>
    </main>
}

export default MoviesApp;
