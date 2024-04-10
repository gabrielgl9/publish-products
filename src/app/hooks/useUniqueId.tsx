import { useEffect, useState } from 'react'
import crypto from 'crypto'

export function useUniqueId() {
  const [id, setId] = useState<string>()

  useEffect(() => setId(crypto.randomBytes(16).toString('hex')), [])

  return id
}