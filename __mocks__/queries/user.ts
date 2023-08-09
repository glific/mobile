import { GET_CURRENT_USER } from '../../graphql/queries/Account';

export const getCurrentUserQuery = {
  request: {
    query: GET_CURRENT_USER,
  },
  result: {
    data: {
      currentUser: {
        user: {
          id: '1',
          name: 'John Doe',
          phone: '+919820198765',
          roles: ['admin'],
          contact: {
            id: '1',
          },
          accessRoles: [
            {
              id: '1',
              label: 'Admin',
            },
          ],
          groups: [
            {
              id: '1',
              label: 'Default Collection',
              description: '',
            },
          ],
          organization: {
            id: '1',
            contact: {
              phone: '917834811114',
            },
          },
          language: {
            id: '1',
            locale: 'en',
          },
        },
      },
    },
  },
};
