export const appRoutes = {
  home: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  people: '/people',
  peopleNew: '/people/new',
  person: (id: string) => `/people/${id}`,
  personEdit: (id: string) => `/people/${id}/edit`,
  birthdays: '/birthdays',
  settings: '/settings',
};
