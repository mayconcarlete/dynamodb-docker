export class RepositoryError extends Error {
  constructor(error: Error){
    super(error.message)
    this.name = 'RepositoryError'
  }
}