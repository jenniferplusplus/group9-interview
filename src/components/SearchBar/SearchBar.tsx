import React, {ChangeEvent, FocusEvent} from 'react';
import {map, Observable, sampleTime} from 'rxjs';
import {useEventCallback} from 'rxjs-hooks';
import SearchService from '../../services/Search';
import './SearchBar.css'

function SearchBar({searchService}: { searchService: SearchService }) {
    const [textChange, searchString] = useEventCallback((event$: Observable<ChangeEvent<HTMLInputElement>>) => {
            const mapped$ = event$.pipe(
                map(event$ => event$.target.value)
            );

            // Input sampling to only query the search every 500ms
            // So as not to get rate limited
            mapped$.pipe(
                sampleTime(500),
            ).subscribe((value => searchService.search(value)))

            return mapped$;
        }, '',
    );

    function highlight(event: FocusEvent<HTMLInputElement>) {
        event.target.select();
    }

    return <nav className={'row navbar navbar-light bg-primary'}>
        <div className={'col-sm'}><h1 className={'navbar-brand'}>Jennifer++</h1></div>
        <div className={'col-sm v-space'}/>
        <input id={'search'}
               className={''}
               autoComplete={'off'}
               type={'text'}
               value={searchString}
               placeholder={'Search for movies'}
               onChange={textChange}
               onFocus={(e) => highlight(e)}></input>
    </nav>;
}

export default SearchBar;
