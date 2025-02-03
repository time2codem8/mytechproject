import React from 'react'

import { Route, Routes } from 'react-router'
import Products from './pages/Products'
import Counter from './pages/Counter'
import GithubSearch from './pages/GithubSearch'
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<GithubSearch />} />
        <Route path='/counter' element = {<Counter />} />
        <Route path='/products' element = {<Products />} />
      </Route>
    
    </Routes>
  )
}


