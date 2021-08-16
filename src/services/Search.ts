import {Observable, Subject, from, of} from "rxjs";

class SearchService {
    // TODO: Retrieve from secret store,
    //  or preferably proxy through our own api so secrets aren't exposed to the client at all
    _apiKey = 'd7a3a18bf1f75a32e20a4c21012ba47b';
    _apiBasePath = 'https://api.themoviedb.org/3/search/movie';
    _subject: Subject<SearchResult>;
    results$: Observable<SearchResult>;

    constructor() {
        this._subject = new Subject<any>();
        this.results$ = this._subject.asObservable();
    }

    search(searchTerm: string, page = 1): Observable<any>{
        if(searchTerm === '') {
            this._subject.next(emptyResult);
            return of();
        }

        const url = `${this._apiBasePath}?query=${searchTerm}&page=${page}&include_adult=false&api_key=${(this._apiKey)}`;
        return from(fetch(url)
            .then(Response => Response.json())
            .then(v => this._subject.next({searchTerm: searchTerm, ...v})));
            // TODO: .catch and do something with errors
    }
}

const emptyResult: SearchResult = {
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
    searchTerm: undefined
}

export interface SearchEntry {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    popularity: number;
    vote_count: number;
    poster_path: string;
    vote_average: number;
}

export interface SearchResult {
    page: number;
    results: Array<SearchEntry>;
    total_results: number;
    total_pages: number;
    searchTerm: string|undefined;
}

export default SearchService
