import bcrypt from 'bcryptjs'

export const encryptPassword = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, 10)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const valid = await bcrypt.compare(password, hash)
  return valid
}
