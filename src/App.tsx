import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { Main, AllContainers, ContainersTable, ContainerInfo, ContainerEdit, AllTransportations, TransportationInfo, Authorization, Registration } from './pages'
import NavigationBar from './components/NavBar';

import { AppDispatch } from "./store";
import { setLogin } from "./store/userSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLogin(localStorage.getItem('login')));
  }, [dispatch]);

  return (
    <div className='d-flex flex-column vh-100'>
      <NavigationBar />
      <div className='container-xl d-flex flex-column px-2 px-sm-3 flex-grow-1'>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/containers" element={<AllContainers />} />
          <Route path="/containers/edit" element={<ContainersTable />} />
          <Route path="/containers/:container_id" element={<ContainerInfo />} />
          <Route path="/containers/edit/:container_id" element={<ContainerEdit />} />

          <Route path="/transportations" element={<AllTransportations />} />
          <Route path="/transportations/:transportation_id" element={<TransportationInfo />} />

          <Route path="/registration" element={<Registration />} />
          <Route path="/authorization" element={<Authorization />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
