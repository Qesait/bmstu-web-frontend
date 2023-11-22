import { Routes, Route, Navigate } from 'react-router-dom';
import { AllContainers } from './pages/AllContainers'
import { ContainerInfo } from './pages/ContainerInfo'
import { AllTransportations } from './pages/AllTransportations'
import { TransportationInfo } from './pages/TransportationInfo'
import NavigationBar from './components/NavBar';
import { useEffect, useState } from 'react';
import LoadAnimation from './components/LoadAnimation';

function App() {
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        console.log(`${import.meta.env.BASE_URL}serviceWorker.js`)
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}serviceWorker.js`, { updateViaCache: 'none' })
          .then(() => {
            navigator.serviceWorker.ready.then(() => {
              console.log("service worker is ready");
              setServiceWorkerRegistered(true)
            })
          })
          .catch(err => console.log("service worker not registered", err))
      })
    }
  })

  return (
    <>
      <NavigationBar />
      {serviceWorkerRegistered ? (
        <div className='container-xl px-2 px-sm-3'>
          <Routes>
            <Route path="/" element={<Navigate to="containers" />} />
            <Route path="/containers" element={<AllContainers />} />
            <Route path="/containers/:container_id" element={<ContainerInfo />} />
            <Route path="/transportations" element={<AllTransportations />} />
            <Route path="/transportations/:transportation_id" element={<TransportationInfo />} />
          </Routes>
        </div>
      ) : (
        <LoadAnimation />
      )}
    </>
  )
}

export default App
