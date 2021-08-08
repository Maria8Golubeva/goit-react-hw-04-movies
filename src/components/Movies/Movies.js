import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import fetch from '../../service';


function Movies() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search).get('query');
    const match = useRouteMatch();
    const history = useHistory();

    const [query, setQuery] = useState('');
    const [submitQuery, setSubmitQuery] = useState(searchParams || '');
    const [movies, setMovies] = useState(null);
    
    useEffect(() => {
        setQuery('');
    }, [movies]);

    useEffect(() => {
        if (!submitQuery) {
            return
        };

        fetch.getByKeyWord(submitQuery)
            .then(r => setMovies(r))
            .catch(console.log);
    }, [submitQuery]);

    function submitHandler(e) {
        e.preventDefault();

        if (!query) {
            return alert('Enter the title of movie')
        };

        history.push({
            ...location,
            search: `query=${query}`
        });

        setSubmitQuery(query);
    };

    function changeHandler(e) {
        setQuery(e.target.value);
    };

    const jsxMovies = movies && movies.map(item => {
        return (
            <li className='movieList' key={item.id}>
                <Link to={{pathname: `${match.url}/${item.id}`, state: {from: location}}}>{item.original_title}</Link>
            </li>
        )
    });
    
    return (
        <>
            <form className='searchForm' onSubmit={submitHandler}>
                <input className='searchFormInput' type='text' onChange={changeHandler} value={query}></input>
                <button className='searchFormBtn' type='submit'>Search</button>
            </form>
            
            <ul>
                {jsxMovies}
            </ul>
        </>
    )
};

export default Movies;