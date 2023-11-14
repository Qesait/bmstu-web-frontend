import './App.css'
import { Routes, Route } from 'react-router-dom';

import { AllContainers } from './pages/AllContainers'
import { ContainerInfo } from './pages/ContainerInfo'
import { NotImplemented } from './pages/NotImplemented'
import NavigationBar from './components/NavBar';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register("/serviceWorker.js")
          .then(_ => console.log("service worker registered"))
          .catch(err => console.log("service worker not registered", err))
      })
    }
  })

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path={`${import.meta.env.BASE_URL}/containers`} element={<AllContainers />} />
        <Route path={`${import.meta.env.BASE_URL}/containers/:container_id`} element={<ContainerInfo />} />
        <Route path={`${import.meta.env.BASE_URL}/transportations`} element={<NotImplemented />} />
      </Routes>
    </>
  )
}

export default App
