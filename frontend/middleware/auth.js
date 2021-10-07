export default function ({ store, redirect }) {
  if (!store.getters.getUserConnected && !store.getters.getAuthenticated) {
    return redirect('/')
  }
}
