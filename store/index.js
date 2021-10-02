export const state = () => ({
  categories: ['Roman', 'Bande dessinés', 'Manga', 'Comics'],
  books: [
    {
      id: 1,
      title: 'Le seigneur des anneaux',
      author: 'J.R.R. Tolkien',
      category: 'Roman',
      available: true,
    },
    {
      id: 2,
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      category: 'Roman',
      available: true,
    },
    {
      id: 3,
      title: 'Les aventures de Tom Sawyer',
      author: 'Mark Twain',
      category: 'Bande dessinés',
      available: true,
    },
    {
      id: 4,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      category: 'Roman',
      available: false,
    },
    {
      id: 5,
      title: 'Dragon Ball',
      author: 'Akira Toriyama',
      category: 'Manga',
      available: true,
    },
  ],
})
export const getters = () => ({})
export const mutations = () => ({})
export const actions = () => ({})
