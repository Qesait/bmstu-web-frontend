import './App.css'
import { Routes, Route } from 'react-router-dom';

import { AllContainers } from './pages/AllContainers'
import { ContainerInfo } from './pages/ContainerInfo'
import { NotImplemented } from './pages/NotImplemented'
import NavigationBar from './components/NavBar';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/containers" element={<AllContainers />} />
        <Route path="/containers/:container_id" element={<ContainerInfo />} />
        <Route path="/transportations" element={<NotImplemented />} />
      </Routes>
    </>
  )
}

export default App
