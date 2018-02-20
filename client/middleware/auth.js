import {routeOption} from '../utilities'

export default function ({store, redirect, route}) {
  if (routeOption(route, 'auth', false)) return
  if (!store.state.auth.user) {
    return redirect('/login')
  }
}
