export default function ({ store, redirect }) {
  if (store.getters.getCurrentUser.role !== 'employee') {
    return redirect('/')
  }
}
