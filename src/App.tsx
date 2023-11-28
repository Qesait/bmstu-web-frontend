import { Routes, Route, Navigate } from 'react-router-dom';
import { AllContainers } from './pages/AllContainers'
import { ContainerInfo } from './pages/ContainerInfo'
import { AllTransportations } from './pages/AllTransportations'
import NavigationBar from './components/NavBar';

function App() {

  return (
    <>
      <NavigationBar />
      <div className='container-xl px-2 px-sm-3'>
        <Routes>
          <Route path="/" element={<Navigate to="containers" />} />
          <Route path="/containers" element={<AllContainers />} />
          <Route path="/containers/:container_id" element={<ContainerInfo />} />
          <Route path="/transportations" element={<AllTransportations />} />
        </Routes>
      </div>
    </>
  )
}

export default App
