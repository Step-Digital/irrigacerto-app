export class UserUnauthorized extends Error {
  constructor () {
    super('Você não tem permissão para efetuar esta operação')
    this.name = 'UserUnauthorized'
  }
}