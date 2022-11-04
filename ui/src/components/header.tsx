
import { Box, Navbar, NavLink, Header, createStyles, Burger, Anchor, MantineProvider, Text, AppShell, } from '@mantine/core';
import './components.css'



const MyHeader = (props: { name: string, setName: (name: string) => void }) => {
    return (
        <Header height={80} p="md" className='headersetup'>
            <label className='tx-header' >Микросервис для фармаконадзора</label>
        </Header>
    )
}

export default MyHeader;