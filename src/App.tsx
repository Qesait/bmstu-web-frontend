import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { AllContainers, ContainerInfo, AllTransportations, TransportationInfo, Authorization, Registration } from './pages'
import NavigationBar from './components/NavBar';

import { AppDispatch } from "./store";
import { setLogin, setRole } from "./store/userSlice";

import AuthCheck, { CUSTOMER, MODERATOR } from './components/AuthCheck'

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const login = localStorage.getItem('login');
    const role = localStorage.getItem('role');
    if (login && role) {
      dispatch(setLogin(login));
      dispatch(setRole(parseInt(role)));
    }
  }, [dispatch]);

  return (
    <div className='d-flex flex-column vh-100'>
      <NavigationBar />
      <div className='container-xl d-flex flex-column px-2 px-sm-3 flex-grow-1'>
        <Routes>
          <Route path="/" element={<Navigate to="/containers" />} />
          <Route path="/containers" element={<AllContainers />} />
          <Route path="/containers/:container_id" element={<ContainerInfo />} />

          <Route path="/transportations" element={<AuthCheck allowedRoles={[CUSTOMER, MODERATOR]}><AllTransportations /></AuthCheck>} />
          <Route path="/transportations/:transportation_id" element={<AuthCheck allowedRoles={[CUSTOMER, MODERATOR]}><TransportationInfo /></AuthCheck>} />

          <Route path="/registration" element={<Registration />} />
          <Route path="/authorization" element={<Authorization />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
