import React, { useContext, useEffect, useState } from 'react'
import Menu from './sidebar/menu/Menu'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react"
import UserContext from '@/src/context/login/userContext'
import ItemsMenuMobile from './sidebar/menu/contain/ItemsMenuMobile'

const Header = ({ rol }) => {
    const { dataUser, getDatos } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        getDatos()
    }, [])

    return (
        <div className='z-40 fixed top-0 left-0 right-0'>
            <div className='w-full flex flex-row lg:hidden justify-between items-center bg-black' radius="none">
                <div className="lg:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white text-xl focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19 12a7 7 0 01-7 7a7 7 0 01-7-7a7 7 0 017-7a7 7 0 017 7zM17 12a5 5 0 01-5 5a5 5 0 01-5-5a5 5 0 015-5a5 5 0 015 5z"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 6a2 2 0 00-2 2a2 2 0 002 2h16a2 2 0 100-4H4zM20 10a2 2 0 00-2 2a2 2 0 00-2-2h4z"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <div className='flex gap-3 p-10'>
                    <Image src="/image/Logo-db.png" width={50} height={50} alt="Logotipo" radius="sm" />
                    <div className="flex flex-col">
                        <p className="text-md">DashBooks</p>
                        <p className="text-small text-default-500">{dataUser.role}</p>
                    </div>

                </div>
                <div>

                </div>
            </div>
            <hr className='text-white' />
            <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} h-screen w-screen z-40 mt-4 lg:mt-0 absolute top-36 backdrop-blur-sm bg-black/30`}>
                <div className={` bg-neutral-900 w-1/3 h-screen`}>
                    <Menu Pagina={ItemsMenuMobile} />
                </div>
            </div>


        </div >

    )
}

export default Header