import SearchService from "./Search";
import fetchMock from "jest-fetch-mock";


describe('SearchService', () => {
    beforeEach(() => {
        fetchMock.mockReturnValue(
            Promise.resolve(
                {json: () => Promise.resolve({})} as Response
            )
        );
    })

    const service = new SearchService();
    test('should fetch from the api', () => {
        service.search('title');

        expect(fetchMock).toHaveBeenCalled();
    });

    test('should include the search term in the query', () => {
        service.search('title');

        expect(fetchMock).toHaveBeenCalledWith('https://api.themoviedb.org/3/search/movie?query=title&page=1&include_adult=false&api_key=d7a3a18bf1f75a32e20a4c21012ba47b');
    });

    test('should include the page number in the query', () => {
        service.search('title', 2);

        expect(fetchMock).toHaveBeenCalledWith('https://api.themoviedb.org/3/search/movie?query=title&page=2&include_adult=false&api_key=d7a3a18bf1f75a32e20a4c21012ba47b');
    });

    test('should not call the api for an empty search term', () => {
        service.search('');

        expect(fetchMock).not.toHaveBeenCalled();
    });

    test('should share the search results for observers', (done) => {
        const expected = {
            expected: true,
            searchTerm: 'test'
        }
        fetchMock.resetMocks();
        fetchMock.mockReturnValue(
            Promise.resolve(
                {json: () => Promise.resolve(expected)} as Response
            )
        );

        service.results$.subscribe((actual => {
            expect(actual).toStrictEqual(expected);
            done();
        }), (error => { expect(error).toBe(null); done(); }), done);

        service.search('test');
    })
})
