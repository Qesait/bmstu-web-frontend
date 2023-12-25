import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { getContainer } from '../api'

import { AppDispatch, RootState } from "../store";
import { setContainer, resetContainer } from "../store/containerSlice"
import { addToHistory } from "../store/historySlice"

import LoadAnimation from '../components/LoadAnimation';
import { BigCCard } from '../components/ContainerCard';
import Breadcrumbs from '../components/Breadcrumbs';

const ContainerInfo: FC = () => {
    let { container_id } = useParams()
    const container = useSelector((state: RootState) => state.container.container);
    const [loaded, setLoaded] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    console.log()

    useEffect(() => {
        getContainer(container_id)
            .then(data => {
                dispatch(setContainer(data))
                dispatch(addToHistory({ path: location, name: data ? data.marking : "неизвестно" }))
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        return () => {
            dispatch(resetContainer());
        };
    }, [dispatch]);

    return loaded ? (
        container ? (
            <>
                <Navbar>
                    <Nav>
                        <Breadcrumbs />
                    </Nav>
                </Navbar>
                <BigCCard {...container} />
            </ >
        ) : (
            <h3 className='text-center'>Такого контейнера не существует</h3>
        )
    ) : (
        <LoadAnimation />
    )
}

export default ContainerInfo