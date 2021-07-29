import React from 'react'
import '../css/BulletList.css'

export function BulletList({ items }) {
  return (
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

