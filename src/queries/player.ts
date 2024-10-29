import { gql } from '@apollo/client';

export const CREATE_PLAYER_MUTATION = gql`
    mutation CreatePlayerMutation($input: CreatePlayerInput!) {
        createPlayer(input: $input) {
            id
            name
            nationalities {
                id
                name
            }
            club_id
        }
    }
`;