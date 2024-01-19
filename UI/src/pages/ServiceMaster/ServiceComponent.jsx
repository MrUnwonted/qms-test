import { useEffect } from 'react'
import { useState } from 'react'
import { getService, updateService, addService } from '../../services/ServiceMaster'
import { useNavigate, useParams } from 'react-router-dom'

const ServiceComponent = () => {

    const [serviceName, setServiceName] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()


    function saveOrUpdateTodo(e) {
        e.preventDefault()

        const currentDate = new Date();

        const service = {
            serviceName,
            description,
            createdDatetime: currentDate.toISOString(),  // Convert to ISO format
            updatedDatetime: id ? currentDate.toISOString() : null,
            createdBy: 2,
        };

        console.log(service);

        if (id) {

            updateService(id, service).then(() => {
                navigate('/services')
            }).catch(error => {
                console.error(error);
            })

        } else {
            addService(service).then((response) => {
                console.log(response.data)
                navigate('/services')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Service</h2>
        } else {
            return <h2 className='text-center'>Add Service</h2>
        }
    }

    useEffect(() => {

        if (id) {
            getService(id).then((response) => {
                console.log(response.data)
                setServiceName(response.data.serviceName)
                setDescription(response.data.description)
                // setCompleted(response.data.completed)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    return (
        <div >
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Service Name:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Service Name'
                                    name='name'
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Service Description:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Service Description'
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>
                            </div>


                            <button className='btn btn-success' onClick={(e) => saveOrUpdateTodo(e)}>Submit</button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ServiceComponent