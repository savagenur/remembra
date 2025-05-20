export const appRoutes = {
  home: '/',
  login: '/login',
  register: '/register',
  people: '/people',
  peopleNew: '/people/new',
  person: (id: string) => `/people/${id}`,
  personEdit: (id: string) => `/people/${id}/edit`,
  birthdays: '/birthdays',
  settings: '/settings',
};
