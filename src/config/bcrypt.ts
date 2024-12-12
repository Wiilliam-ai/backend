import bcrypt from 'bcrypt'

export class Bcrypt {
  static hash(text: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(text, salt)
  }

  static compare(text: string, hash: string) {
    return bcrypt.compareSync(text, hash)
  }
}
