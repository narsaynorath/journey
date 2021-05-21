import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button } from 'primereact/button';

import { CURRENT_USER_QUERY } from '../lib/user';

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    endSession
  }
`;

export default function Logout() {
  const [logout] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <Button label="Logout" className="p-button-secondary" onClick={logout} />
  );
}
