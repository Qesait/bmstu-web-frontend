import { NavLink } from "react-router-dom"
import './Navbar.css'

export const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='nav__wrapper'>
                <div className='nav__links'>
                    <NavLink to='/' className='nav__link'>Главная</NavLink>
                    <NavLink to='/items' className='nav__link'>Товары</NavLink>
                    <NavLink to='/orders' className='nav__link'>Заказы</NavLink>
                    <NavLink to='/about' className='nav__link'>О магазине</NavLink>
                </div>
                <div className='nav__cart'>
                    <NavLink to='/cart' className='nav__link nav__link--card'>Корзина</NavLink>
                </div>
                <div className='nav__mobile-wrapper'
                    onClick={(event) => event.currentTarget.classList.toggle('active')}
                >
                    <div className='nav__mobile-target' />
                    <div className='nav__mobile-menu' onClick={(event) => event.stopPropagation()}>
                        <NavLink to='/' className='nav__link'>Главная</NavLink>
                        <NavLink to='/items' className='nav__link'>Товары</NavLink>
                        <NavLink to='/orders' className='nav__link'>Заказы</NavLink>
                        <NavLink to='/about' className='nav__link'>О магазине</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}