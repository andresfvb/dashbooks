import React from 'react'
import ItemsMenu from './contain/ItemsMenu'
import styles from '@/styles/sidebar/menu.module.css'
const Menu = () => {
    return (
        <nav className={styles.menuContainer}>
            <ItemsMenu />
        </nav>
    )
}

export default Menu