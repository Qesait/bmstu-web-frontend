import './App.css'
import { Routes, Route, Link } from 'react-router-dom';

import { Main } from './pages/MainPage'
import { Container } from './pages/ContainerPage'

function App() {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/containers">Container</Link>
      </header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/containers" element={<Container />} />
      </Routes>
    </>
  )
}

export default App
