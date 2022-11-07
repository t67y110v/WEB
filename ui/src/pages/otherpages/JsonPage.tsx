import { Modal, Button, Group, TextInput, PasswordInput, Select, Textarea } from "@mantine/core"
import { Navigate } from 'react-router-dom';
import { JsonInput } from '@mantine/core';
import { useState } from 'react'

const JsonPage = (props : {name : string}) => {
    if (props.name == "") {
        return <Navigate to="/login" />
    }
    const [redirect, setRedirect] = useState(false);
    const submit = async () => {
        const response = await fetch('http://localhost:4000/api/jsonrequest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({

            })
        });

        const content = await response.json();

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/home" />
    }


    return (
        <div className="container-fluid">
            <div className="row justify-content-md">
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="InputForm-form-container">
                        <div className='InputForm-form'>
                            <div className='InputForm-form-content' >
                                <h1 className="InputForm-form-title tx">Отправить запрос в формате .json</h1>

                                <br></br>
                                <div className="form-shadow">
                                    <h2 className="InputForm-form-title tx">Для того чтобы отправить запрос с сайта в формате json скопируйте его в текстовое поле ниже</h2>
                                    <form onSubmit={submit}>
                                        <JsonInput
                                            placeholder="Ваш .json файл"

                                            radius="xl"
                                            size="xl"
                                        />
                                        <br></br>
                                        <Button
                                            fullWidth
                                            size="md"
                                            variant="light"
                                            className='btn-cr'
                                            color="cyan"
                                            radius="xl"
                                            type="submit">
                                            Отправить
                                        </Button>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>






    )


}

export default JsonPage;