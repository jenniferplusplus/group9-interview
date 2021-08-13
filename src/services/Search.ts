import {Observable, Subject} from "rxjs";

class searchService {
    // TODO: Retrieve from secret store,
    //  and preferably proxy through an api so secrets aren't exposed to the client at all
    _apiKey = 'd7a3a18bf1f75a32e20a4c21012ba47b';
    _apiBasePath = 'https://api.themoviedb.org/3/search/movie';
    _subject: Subject<any>;
    results$: Observable<any>;

    constructor() {
        this._subject = new Subject<any>();
        this.results$ = this._subject.asObservable();
    }

    search(title: string, page = 1): Observable<any>{
        const url = `${this._apiBasePath}?query=${title}&page=${page}&include_adult=false&api_key=${(this._apiKey)}`;
        fetch(url)
            .then(Response => Response.json())
            .then(v => this._subject.next(v));
            // TODO: .catch and do something with errors
        return this.results$;
    }
}