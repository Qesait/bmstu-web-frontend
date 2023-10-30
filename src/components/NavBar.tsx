import { NavLink } from "react-router-dom"
import './Navbar.css'

export const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='nav__wrapper'>
                <div className='nav__links'>
                    <NavLink to='/containers' className='nav__link'>Список контейнеров</NavLink>
                    <NavLink to='/transportations' className='nav__link'>Перевозки</NavLink>
                </div>
                <div className='nav__mobile-wrapper'
                    onClick={(event) => event.currentTarget.classList.toggle('active')}
                >
                    <div className='nav__mobile-target' />
                    <div className='nav__mobile-menu' onClick={(event) => event.stopPropagation()}>
                        <NavLink to='/containers' className='nav__link'>Список контейнеров</NavLink>
                        <NavLink to='/transportations' className='nav__link'>Перевозки</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}