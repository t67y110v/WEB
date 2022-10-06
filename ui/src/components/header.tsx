import { useState } from 'react';
import { Link } from "react-router-dom";
import { Box, Navbar, NavLink, Header, createStyles, Burger, Anchor, MantineProvider, Text, AppShell, } from '@mantine/core';
import './components.css'



const MyHeader = (props: { name: string, setName: (name: string) => void }) => {
    const logout = async () => {
        await fetch('http://localhost:4000/api/logout', {
            method: "POST",
            headers: { 'Content-Type': 'application-json' },
            credentials: 'include',

        })
        props.setName('')
    }


    let menu

    if (props.name === '') {
        menu = (
            <Box>
                <NavLink label="Home" component={Link} to="/home" active={location.pathname === '/home'} />
                <NavLink label="About" component={Link} to="/about" active={location.pathname === '/about'} />

            </Box>

        )
    }

    const [opened, setOpened] = useState(false);
    return (

        <Header height={70} p="md" className='headersetup'>
            <Text align="center" size="xl" weight={700} color="#EDF5E1">Курсовая работа</Text>


        </Header>







    )

}

export default MyHeader;