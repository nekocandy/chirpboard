import * as Realm from 'realm-web'

export function useRealmApp() {
  const config = useRuntimeConfig()

  return new Realm.App(config.public.realmId)
}
