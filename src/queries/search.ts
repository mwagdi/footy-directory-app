import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
    query SearchQuery($input: String!) {
        search(input: $input) {
            nations {
                id
                name
            }
            clubs {
                id
                name
                logo
            }
            players {
                id
                name
            }
        }
    }
`;