export class UnexpectedError extends Error {
  constructor () {
    super('Desculpe-nos! Não conseguimos processar sua solicitação')
    this.name = 'UnexpectedError'
  }
}