import { createHmac } from 'node:crypto'

export const encrypt = (content: string) => {
  const hash = createHmac('md5', process.env.JWT_SECRET || '')
  hash.update(content)
  return hash.digest('hex')
}
