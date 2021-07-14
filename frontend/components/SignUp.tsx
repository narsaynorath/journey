import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Alert, Button, Card, TextField } from '@material-ui/core';

import useForm from '../lib/useForm';

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

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      data: {
        name: $name
        username: $username
        email: $email
        password: $password
      }
    ) {
      name
      email
    }
  }
`;

function getSuccessMessage({ email, name }) {
  if (name) {
    return `You have successfully signed up! Please login with your new account, ${name}.`;
  }

  return `You have successfully signed up! Please login with your new account.`;
}

export default function SignUp() {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs,
  });

  return (
    <CardStyles>
      <Card style={{ width: '600px' }}>
        <HeaderStyles>
          <h1>Sign Up</h1>
        </HeaderStyles>
        <FormStyles
          onSubmit={async (e) => {
            e.preventDefault();
            await signUp();
            clearForm();
          }}
        >
          {error && (
            <Alert severity="error">This user account is already taken.</Alert>
          )}
          {data?.createUser && (
            <Alert severity="success">
              {getSuccessMessage({ ...data.createUser })}
            </Alert>
          )}
          <label htmlFor="name">Name (optional)</label>
          <TextField
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
          <label htmlFor="username">Username</label>
          <TextField
            id="username"
            name="username"
            required={true}
            value={inputs.username}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <TextField
            id="email"
            name="email"
            type="email"
            required={true}
            value={inputs.email}
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
                Sign Up
              </Button>
            </ButtonStyles>
          </FormFooter>
        </FormStyles>
      </Card>
    </CardStyles>
  );
}
