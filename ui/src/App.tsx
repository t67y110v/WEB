
import { Box } from '@mantine/core'
import './App.css'
import useSWR from 'swr'
import AddUser from './components/addUser';


const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

export const ENDPOINT = "http://localhost:4000";


function App() {

  const { data, mutate } = useSWR('healthcheck', fetcher)



  return (
    <Box>
      TEST

          < AddUser />
    </Box>
  )


}

export default App
