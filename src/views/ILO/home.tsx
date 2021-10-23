import React, { useState, useEffect } from 'react'
import Coming from './coming'
import Ilo from './Ilo'

const TIMESTAMP = process.env.REACT_APP_TIMESTAMP || '1622476799'
const ILO = () => {
  const [come, setCome] = useState(false)
  useEffect(() => {
    const newTieme = Math.floor(new Date().getTime() / 1000)
    if (Number(TIMESTAMP) < newTieme) {
      setCome(true)
    }
  }, [])
  return come ? <Ilo /> : <Coming />
}

export default ILO
