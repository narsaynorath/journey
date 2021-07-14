import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import styled from 'styled-components';

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
            <Message
              severity="error"
              text="This user account is already taken."
            />
          )}
          {data?.createUser && (
            <Message
              severity="success"
              text={getSuccessMessage({ ...data.createUser })}
            />
          )}
          <label htmlFor="name" className="p-d-block">
            Name (optional)
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
            required={true}
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
            required={true}
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
            required={true}
            className="p-d-block"
            value={inputs.password}
            onChange={handleChange}
          />
          <FormFooter>
            <ButtonStyles>
              <Button
                type="submit"
                label="Sign Up"
                icon="pi pi-ticket"
                iconPos="right"
              />
            </ButtonStyles>
          </FormFooter>
        </FormStyles>
      </Card>
    </CardStyles>
  );
}
