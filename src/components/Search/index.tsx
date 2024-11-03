import { ChangeEvent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_QUERY } from 'queries/search';
import { Input } from 'components/ui/input';

const Search = () => {
    const [search, setSearch] = useState('');
    const { data } = useQuery(SEARCH_QUERY, {
        variables: { input: search },
        skip: !search
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <h1>Search</h1>
            <Input onChange={handleChange} name="search" type="search" value={search} />
            <div className="flex flex-col gap-5 mt-2">
                <h2 className="font-extrabold text-xl">Results</h2>
                {data?.search.nations.length > 0 && (
                    <div>
                        <h3 className="font-bold text-lg">Nations</h3>
                        {data.search.nations.map(nation => (
                            <p key={`nation_${nation.id}`}>{nation.name}</p>
                        ))}
                    </div>
                )}
                {data?.search.clubs.length > 0 && (
                    <div>
                        <h3 className="font-bold text-lg">Clubs</h3>
                        {data.search.clubs.map(club => (
                            <p key={`club_${club.id}`}>{club.name}</p>
                        ))}
                    </div>
                )}
                {data?.search.players.length > 0 && (
                    <div>
                        <h3 className="font-bold text-lg">Players</h3>
                        {data.search.players.map(player => (
                            <p key={`player_${player.id}`}>{player.name}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;