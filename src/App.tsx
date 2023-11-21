import { Routes, Route, Navigate } from 'react-router-dom';

import { AllContainers } from './pages/AllContainers'
import { ContainerInfo } from './pages/ContainerInfo'
import { NotImplemented } from './pages/NotImplemented'
import NavigationBar from './components/NavBar';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        console.log(`${import.meta.env.BASE_URL}serviceWorker.js`)
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}serviceWorker.js`)
          .then(() => {
            console.log("service worker registered");
          })
          .catch(err => console.log("service worker not registered", err))
      })
    }
  })

  return (
    <>
      <NavigationBar />
      <div className='container-xl px-2 px-sm-3'>
        <Routes>
          <Route path="/" element={<Navigate to="containers" />} />
          <Route path="/containers" element={<AllContainers />} />
          <Route path="/containers/:container_id" element={<ContainerInfo />} />
          <Route path="/transportations" element={<NotImplemented />} />
        </Routes>
      </div>
    </>
  )
}

export default App
