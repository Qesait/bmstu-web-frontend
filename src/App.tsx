import './App.css'
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
        console.log(`${import.meta.env.BASE_URL}/serviceWorker.js`)
        navigator.serviceWorker
          .register(`${import.meta.env.BASE_URL}/serviceWorker.js`)
          .then(_ => console.log("service worker registered"))
          .catch(err => console.log("service worker not registered", err))
      })
    }
  })

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path={`${import.meta.env.BASE_URL}/`} element={<Navigate to={`${import.meta.env.BASE_URL}/containers`} />} />
        <Route path={`${import.meta.env.BASE_URL}/containers`} element={<AllContainers />} />
        <Route path={`${import.meta.env.BASE_URL}/containers/:container_id`} element={<ContainerInfo />} />
        <Route path={`${import.meta.env.BASE_URL}/transportations`} element={<NotImplemented />} />
      </Routes>
    </>
  )
}

export default App
