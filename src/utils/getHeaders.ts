const token = localStorage.getItem('authorization')
const user = localStorage.getItem('user')
let headers : any
if (!token || !user) {
  headers = {
    headers: {
      user: '',
      authorization: `Bearer ${token}`,
    },
  }
} else {
  headers = {
    headers: {
      authorization: `Bearer ${token.replaceAll('"', '')}`,
      user: user.replaceAll('"', ''),
    },
  }
}

export { headers }
