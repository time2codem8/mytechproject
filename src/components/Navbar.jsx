import React from 'react'
import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div class="flex items-center gap-4 p4">
        <Link to='/'>GithubSearch</Link>
        <Link to='/counter'>Counter</Link>
        <Link to='/products'>Products</Link>
    </div>
  )
}
