enum CacheType {
  local,
  session,
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.local ? localStorage : sessionStorage
  }

  setCache<T>(key: string, value: T) {
    let _key = ''
    if (typeof value === 'string') {
      _key = key
    }
    else {
      _key = JSON.stringify(key)
    }
    this.storage.setItem(_key, JSON.stringify(value))
  }

  getCache<T>(key: string): T | null {
    const data = this.storage.getItem(key)
    if (data) {
      if (isValidJSON(data)) {
        return JSON.parse(data)
      }
      else {
        return data as T
      }
    }
    return null
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.local)
const sessionCache = new Cache(CacheType.session)

export { localCache, sessionCache }

function isValidJSON(data: string): boolean {
  try {
    JSON.parse(data)
    return true
  }
  catch (err) {
    return false
  }
}
