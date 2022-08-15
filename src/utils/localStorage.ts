const setLocalStorage = (key: string, value: any) => {
  if(typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

export { setLocalStorage }