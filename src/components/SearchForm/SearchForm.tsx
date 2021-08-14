import React, {ChangeEvent, FocusEvent} from 'react';
import {map, Observable, sampleTime} from 'rxjs';
import {useEventCallback} from 'rxjs-hooks';
import SearchService from '../../services/Search';

function SearchForm({searchService}: { searchService: SearchService }) {
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

    return <input id={'search'}
                  autoComplete={'off'}
                  type={'text'}
                  value={searchString}
                  onChange={textChange}
                  onFocus={(e) => highlight(e)}></input>;
}

export default SearchForm;
