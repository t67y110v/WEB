import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from "react-router-dom"
import { Modal, Button, Group, TextInput, PasswordInput, Select, Textarea } from "@mantine/core"
import { IconLogin, IconLock, IconAt, IconArrowsCross} from '@tabler/icons';
import './pages.css'



const InputForm = (props: { setName: (name: string) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();

        setRedirect(true);
        props.setName(content.name);
    }

    if (redirect) {
        return <Navigate to="/home" />
    }


    return (

        <div className="container-fluid">
            <div className="row justify-content-md">
                <div className="col-3"> </div>
                <div className="col-6">
                    <div className="InputForm-form-container">
                        <div className='InputForm-form'>
                            <div className='InputForm-form-content' >
                                <h3 className="InputForm-form-title tx">Отправка сообщения о нежелательной реакции</h3>
                                <div className="form-shadow">
                                    <form onSubmit={submit}>
                                        <label className='tx'>Наименование компании</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите название компании"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Наименование ДРУ</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите название ДРУ"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Дата проверки</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите дату проверки компании"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Веб-сайт, телефон</label>
                                        <TextInput
                                        
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите вебсайт-телефон компании"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Наличие информации о фармаконадзоре на сайте</label>
                                        <Select
                                            radius="xl"
                                            variant="filled"
                                            placeholder="Наличие информации о фармаконадзоре на сайте"
                                            data={[
                                                { value: 'yes', label: 'Информация есть' },
                                                { value: 'no', label: 'Информации нет' },
                                              
                                            ]}
                                        />
                                        <label className='tx'>Тип обращения</label>
                                        <Select
                                            radius="xl"
                                            variant="filled"
                                            placeholder="Наличие информации о фармаконадзоре на сайте"
                                            data={[
                                                { value: 'rzn', label: 'РЗН' },
                                                { value: 'ro', label: 'РО' },
                                              
                                            ]}
                                        />
                                        <label className='tx'>Контактные данные потребителя</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите контактные данные потребителя"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Описание реакции</label>
                                        <Textarea
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите описание реакции"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Наименование ЛП</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите свою почту"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>ДРУ ЛП</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите свою почту"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Описание действий по случаю</label>
                                        <Textarea
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Описание действий по случаю"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Статус по случаю</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите Статус по случаю"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Срок отправки первичного письма</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите Срок отправки первичного письма"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Финальный ответ направлен в РО</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите Финальный ответ направлен в РО"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Номер извещения в АИС РЗН</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Номер извещения в АИС РЗН"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <label className='tx'>Валидность</label>
                                        <TextInput
                                           
                                            required
                                            mb={12}
                                            variant="filled"
                                            radius="xl"
                                            placeholder="Введите валидность"
                                            onChange={e => setEmail(e.target.value)}
                                        />

                                        <br></br>
                                        <Button leftIcon={<IconArrowsCross />} fullWidth size="md" variant="light" className='btn-cr' color="cyan" radius="xl" type="submit">Отправить</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                </div>
            </div>
        </div>
    )
}


export default InputForm