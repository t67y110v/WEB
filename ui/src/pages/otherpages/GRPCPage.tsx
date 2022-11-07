import { Navigate } from 'react-router-dom';
import { Timeline, Text } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons';
import './pages.css'

const GRPCPage = (props : {name : string}) => {
    if (props.name == "") {
        return <Navigate to="/login" />
    }

    return (
        <div className="container-fluid">
        <div className="row justify-content-md">
            <div className="col-2"></div>
            <div className="col-8">
                <div className="InputForm-form-container">
                    <div className='InputForm-form'>
                        <div className='InputForm-form-content' >

                        <h2 className="InputForm-form-title tx">Отправление сообщения о НР по gRPC</h2>
                        <br></br>
                            <div className="form-shadow">
                                <Timeline active={1} bulletSize={34} lineWidth={5}>
                                    <Timeline.Item bullet={<IconGitBranch size={24} />} title="private_service_method запрос на порт :7070">
                                        <Text color="black" size="sm">Тело запроса можно посмотреть по <Text variant="link" component="span" inherit>ссылке</Text></Text>
                                        <Text size="xs" mt={4}>Мгновенно</Text>
                                    </Timeline.Item>

                                    <Timeline.Item bullet={<IconGitCommit size={24} />} title="Обработка запроса на сервере">
                                        <Text color="black" size="sm">Валидация, структуризация, конвертация запроса</Text>
                                        <Text size="xs" mt={4}>1-2 mins</Text>
                                    </Timeline.Item>

                                    <Timeline.Item title="Отправка запроса с сервера на АИС РЗН" bullet={<IconGitPullRequest size={24} />} lineVariant="dashed">
                                        <Text color="black" size="sm">Ответ с АИС РЗН приходит в будние дни с 8:00-17:00</Text>
                                        <Text size="xs" mt={4}>1-3 days</Text>
                                    </Timeline.Item>

                                    <Timeline.Item title="Получение ответа с АИС РЗН" bullet={<IconMessageDots size={24} />}>
                                        <Text color="black" size="sm">Уведомление об ответе приходит на почту, посомтореть его можно там,в системе, или в ответе сервера<Text variant="link" component="span" inherit> пример тела ответа.</Text> </Text>

                                    </Timeline.Item>
                                </Timeline> </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    )


}

export default GRPCPage;