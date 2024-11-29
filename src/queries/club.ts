import { gql } from '@apollo/client';

export const CREATE_CLUB_MUTATION = gql`
    mutation CreateClubMutation($input: CreateClubInput!) {
        createClub(input: $input) {
            id
            name
            nation_id
            logo
        }
    }
`;

export const CLUBS_QUERY = gql`
    query Query {
        clubs {
            id
            name
            nation {
                id
                name
            }
        }
    }
`;