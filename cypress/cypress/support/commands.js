import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', ({ username, password }) => {
  const mutation = `
    mutation LOGIN_MUTATION {
      authenticateUserWithPassword(username: "${username}", password: "${password}") {
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

  cy.request({
    url: 'http://localhost:3000/api/graphql',
    method: 'POST',
    body: {
      query: mutation,
    },
  }).its('body');
});

Cypress.Commands.add('getUserId', ({ username }) => {
  const query = `
    query GET_ALL_USERS {
      allUsers(where: { username_contains_i: "${username}" }) {
        id
      }
    }
  `;

  cy.request({
    url: 'http://localhost:3000/api/graphql',
    method: 'POST',
    body: {
      query,
    },
  }).its('body');
});

Cypress.Commands.add('deleteUser', ({ username }) => {
  cy.getUserId({ username }).then((result) => {
    if (result?.data?.allUsers.length) {
      const ids = result.data.allUsers.map((user) => user.id);
      const mutation = `
        mutation DELETE_USERS {
          deleteUsers(ids: ${ids}) {
            id
          }
        }
      `;
      cy.request({
        url: 'http://localhost:3000/api/graphql',
        method: 'POST',
        body: {
          query: mutation,
        },
      });
    }
  });
});

Cypress.Commands.add('createUser', ({ name, username, email, password }) => {
  const mutation = `
    mutation CREATE_USER {
      createUser(data: {
        name: "${name}",
        username: "${username}",
        email: "${email}",
        password: "${password}"}
      ) {
        id
      }
    }
  `;
  cy.request({
    url: 'http://localhost:3000/api/graphql',
    method: 'POST',
    body: {
      query: mutation,
    },
  });
});
