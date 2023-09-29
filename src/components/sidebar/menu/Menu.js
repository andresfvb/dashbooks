import React from 'react'
import ItemsMenu from './contain/ItemsMenu'
import styles from '@/styles/sidebar/menu.module.css'
const Menu = ({ Pagina }) => {
    return (
        <nav className={styles.menuContainer}>
            <Pagina />
        </nav>
    )
}

export default Menu