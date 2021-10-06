export const state = () => ({
  categories: ['Roman', 'Bande dessinés', 'Manga', 'Comics'],
  books: [
    {
      _id: '1',
      title: 'Le seigneur des anneaux',
      author: 'J.R.R. Tolkien',
      category: 'Roman',
      available: true,
      borrowConfirmed: false,
      publishingDate: '1954-01-01',
      description:
        "Le seigneur des anneaux est un roman de fantasy écrit par l'auteur britannique J.R.R. Tolkien, publié en 1954.",
      cover: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      createdAt: '2020-01-01'
    },
    {
      _id: '2',
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      category: 'Roman',
      available: true,
      borrowConfirmed: false,
      publishingDate: '1997-01-01',
      description:
        "Harry Potter est un roman de fantasy écrit par l'auteur britannique J.K. Rowling, publié en 1997.",
      cover: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      createdAt: '2020-01-01'
    },
    {
      _id: '3',
      title: 'Les aventures de Tom Sawyer',
      author: 'Mark Twain',
      category: 'Bande dessinés',
      available: false,
      borrowConfirmed: false,
      publishingDate: '1876-01-01',
      description: 'Machin machin machin',
      cover: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      createdAt: '2020-01-01',
      borrowedDate: '2021-07-01',
      dueDate: '2021-10-24'
    },
    {
      _id: '4',
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      category: 'Roman',
      available: true,
      borrowConfirmed: false,
      borrowedBy: '2',
      publishingDate: '1943-01-01',
      description: 'Machin machin machin',
      cover: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      createdAt: '2020-01-01'
    },
    {
      _id: '5',
      title: 'Dragon Ball',
      author: 'Akira Toriyama',
      category: 'Manga',
      available: false,
      borrowConfirmed: true,
      borrowedBy: '1',
      publishingDate: '1986-01-01',
      description: 'Machin machin machin',
      cover: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
      createdAt: '2020-01-01',
      borrowedDate: '2021-07-01',
      retrievedDate: '2021-08-28',
      dueDate: '2021-09-05'
    }
  ],
  currentUser: {
    _id: '1',
    name: 'John Doe',
    role: 'employee'
  },
  isConnected: true
})
export const getters = {
  getBooks: (state) => state.books,
  getCategories: (state) => state.categories,
  getCurrentUser: (state) => state.currentUser,
  getUserConnected: (state) => state.isConnected
}
export const mutations = () => ({})
export const actions = () => ({})
