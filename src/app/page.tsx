import { getClient } from 'lib/client';
import { gql } from '@apollo/client';
import { Query } from '../generated/graphql';

const NATIONS_QUERY = gql`
  query Query {
    nations {
      id
      name
      population
    }
  }
`;

const Home = async () => {
  const client = getClient();
  const { data } = await client.query<Query>({ query: NATIONS_QUERY });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {data?.nations.map((nation) => <p key={nation?.id}>{nation?.name}</p>)}
      </main>
    </div>
  );
};

export default Home;
