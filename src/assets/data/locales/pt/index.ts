import user from './user.json'
import company from './company.json'
import commom from './commom.json'
import tickets from './tickets.json'

export default {
  ...user,
  ...company,
  ...commom,
  ...tickets,
}
