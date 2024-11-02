'use client';

import { Input } from 'components/ui/input';
import { ChangeEvent, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_QUERY } from 'queries/search';

const Search = () => {
    const [search, setSearch] = useState('');
    const { data } = useQuery(SEARCH_QUERY, {
        variables: { input: search }
    });

    useEffect(() => {
        console.log({ data });
    }, [data]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setSearch(event.target.value);
    };

    return (
        <div>
            <h1>Search</h1>
            <Input onChange={handleChange} name="search" type="search" value={search} />
        </div>
    );
};

export default Search;