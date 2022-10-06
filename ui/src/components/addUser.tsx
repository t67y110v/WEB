import { useState } from "react"
import { useForm } from '@mantine/form'
import { Modal, Button, Group, TextInput, PasswordInput } from "@mantine/core"
import { ENDPOINT, User } from "../App"
import { KeyedMutator } from "swr"

function AddUser({ mutate }: { mutate: KeyedMutator<User> }) {
    const [open, setOpen] = useState(false)
    const form = useForm({
        initialValues: {
            email: '',
            password: '',  
        }
    })  


    async function createUser(values: { email: string ; password: string }) {
        const updated = await fetch(`${ENDPOINT}/session`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(r => r.json)
        mutate(updated)
        form.reset()
        setOpen(false)

    }
    return (
        <>
         
                <form onSubmit={form.onSubmit(createUser)}>
                    <TextInput
                        required
                        mb={12}
                        label="Почта"
                        placeholder="ВВедите свою почту"
                        {
                        ...form.getInputProps("email")
                        }
                    />
                    <PasswordInput
                        label="Пароль"
                        required
                        mb={12}
                        placeholder="Введите пароль"
                        {
                        ...form.getInputProps("password")
                        }
                    />
                    <Button fullWidth type="submit">Войти </Button>
                </form>
           
        </>
    )
}

export default AddUser