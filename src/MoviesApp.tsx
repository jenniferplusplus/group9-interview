import React from "react";
import './MoviesApp.css';
import Movie from "./components/Movie";

function MoviesApp() {
    const movies = [
        {title: 'Star Wars'},
        {title: 'Star Trek'},
        {title: 'Starship Troopers'}
    ]
    return <main className={'container-lg'}>
        <section className={'row'}><div className={'col g'}>Search</div></section>
        <section className={'row'}><div className={'col g'}>
            {movies.map(each => <Movie title={each.title}/>)}
        </div></section>
    </main>
}

export default MoviesApp;
