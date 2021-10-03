export default function ({ store, redirect }) {
  if (!store.getters.getUserConnected) {
    return redirect('/')
  }
}
