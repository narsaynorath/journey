import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import styled from 'styled-components';

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
  margin: 0 auto;
  max-width: 500px;

  input {
    margin-bottom: 12px;
  }
`;

const FormFooter = styled.footer`
  display: flex;
  justify-content: right;
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

  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <CardStyles>
      <Card style={{ width: '600px' }}>
        <HeaderStyles>
          <h1>Login</h1>
        </HeaderStyles>
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await login();
              console.log(data);
              router.push('/');
            } catch {}
          }}
        >
          {error && <Message severity="error" text="An error occurred." />}
          <label htmlFor="username" className="p-d-block">
            Username
          </label>
          <InputText
            id="username"
            name="username"
            aria-describedby="username-help"
            required={true}
            className="p-d-block"
            value={inputs.username}
            onChange={handleChange}
          />
          <label htmlFor="password" className="p-d-block">
            Password
          </label>
          <InputText
            id="password"
            name="password"
            type="password"
            aria-describedby="password-help"
            required={true}
            className="p-d-block"
            value={inputs.password}
            onChange={handleChange}
          />
          <FormFooter>
            <ButtonStyles>
              <Button
                type="submit"
                label="Login"
                icon="pi pi-ticket" // TODO: Change this
                iconPos="right"
              />
            </ButtonStyles>
          </FormFooter>
        </FormStyles>
      </Card>
    </CardStyles>
  );
}
