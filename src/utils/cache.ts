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
    let val = ''
    if (typeof value === 'string') {
      val = value
    }
    else {
      val = JSON.stringify(value)
    }
    this.storage.setItem(key, val)
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
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (_) {
    return false
  }
}
