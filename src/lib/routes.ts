export const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  people: '/people',
  person: (id: string) => `/people/${id}`,
  personEdit: (id: string) => `/people/${id}/edit`,
  birthdays: '/birthdays',
  settings: '/settings',
};
