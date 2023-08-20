type Key = 'viewed'

export const WorkingWithSessionStorage = {
  save(key: Key, value: string) {
    sessionStorage.setItem(key, value)
  },
  get(key: Key) {
    return sessionStorage.getItem(key)
  },
  delete(key: Key) {
    sessionStorage.removeItem(key)
  },
  update(key: Key, value: string) {
    this.delete(key)
    this.save(key, value)
  },
  clearAll() {
    sessionStorage.clear()
  }
}
