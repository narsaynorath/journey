import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';

import { Button, Card, TextField } from '@material-ui/core';
import { Message } from 'primereact/message';

import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from '../lib/user';

const CardStyles = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const HeaderStyles = styled.header`
  display: flex;
  justify-content: center;
`;

const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto 24px auto;
  max-width: 500px;
`;

const FormFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
`;

const ButtonStyles = styled.div`
  width: fit-content;
`;

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    authenticateUserWithPassword(username: $username, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          username
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const { inputs, handleChange } = useForm({
    username: '',
    password: '',
  });

  const [login, { data }] = useMutation(LOGIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
  return (
    <CardStyles>
      <Card style={{ width: '600px' }}>
        <HeaderStyles>
          <h1>Login</h1>
        </HeaderStyles>
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            const result = await login();
            if (!result?.data?.authenticateUserWithPassword?.message) {
              router.push('/');
            }
          }}
        >
          {error && <Message severity="error" text="An error occurred." />}
          <label htmlFor="username">Username</label>
          <TextField
            id="username"
            name="username"
            required={true}
            value={inputs.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <TextField
            id="password"
            name="password"
            type="password"
            required={true}
            value={inputs.password}
            onChange={handleChange}
          />
          <FormFooter>
            <ButtonStyles>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </ButtonStyles>
          </FormFooter>
        </FormStyles>
      </Card>
    </CardStyles>
  );
}
