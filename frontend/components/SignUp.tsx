import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import styled from 'styled-components';

import useForm from '../lib/useForm';

const FormStyles = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 500px;

  input {
    margin-bottom: 12px;
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
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
    }
  }
`;

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
    <div>
      <header>
        <h1>Sign Up</h1>
      </header>
      <FormStyles
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await signUp();
            clearForm();
          } catch {}
        }}
      >
        {error && (
          <Message
            severity="error"
            text="This user account is already taken."
          />
        )}
        {data?.createUser && (
          <Message
            severity="success"
            text={`You have successfully signed up! Please login with your new account, ${data.createUser.name}.`}
          />
        )}
        <label htmlFor="name" className="p-d-block">
          Name
        </label>
        <InputText
          id="name"
          name="name"
          aria-describedby="name-help"
          className="p-d-block"
          value={inputs.name}
          onChange={handleChange}
        />
        <label htmlFor="username" className="p-d-block">
          Username
        </label>
        <InputText
          id="username"
          name="username"
          aria-describedby="username-help"
          className="p-d-block"
          value={inputs.username}
          onChange={handleChange}
        />
        <label htmlFor="email" className="p-d-block">
          Email
        </label>
        <InputText
          id="email"
          name="email"
          type="email"
          aria-describedby="email-help"
          className="p-d-block"
          value={inputs.email}
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
          className="p-d-block"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </FormStyles>
    </div>
  );
}
