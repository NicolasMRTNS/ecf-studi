export const state = () => ({
  categories: ['roman', 'bande dessinés', 'manga', 'comics'],
  books: [
    {
      id: 1,
      title: 'Le seigneur des anneaux',
      author: 'J.R.R. Tolkien',
      category: 'roman',
      available: true,
    },
    {
      id: 2,
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      category: 'roman',
      available: true,
    },
    {
      id: 3,
      title: 'Les aventures de Tom Sawyer',
      author: 'Mark Twain',
      category: 'bande dessinés',
      available: true,
    },
    {
      id: 4,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      category: 'roman',
      available: false,
    },
  ],
})
export const getters = () => ({})
export const mutations = () => ({})
export const actions = () => ({})
