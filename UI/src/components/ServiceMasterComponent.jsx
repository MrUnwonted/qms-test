import { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService'
import { getAllService, getService, updateService, deleteService, setIsActive } from '../services/ServiceMaster'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../services/AuthService'

const ServiceMasterComponent = () => {

    const [service, setService] = useState([])

    const navigate = useNavigate()

    const isAdmin = isAdminUser();


    useEffect(() => {
        listServices();
    }, [])

    function listServices() {
        getAllService().then((response) => {
            setService(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewService() {
        navigate('/add-todo')

    }

    function updateService(id) {
        console.log(id)
        navigate(`/update-todo/${id}`)
    }

    function removeService(id) {
        deleteService(id).then((response) => {
            listServices();
        }).catch(error => {
            console.error(error)
        })
    }

    function markCompleteService(id) {
        setIsActive(id).then((response) => {
            listServices()
        }).catch(error => {
            console.error(error)
        })
    }

    // function markInCompleteTodo(id){
    //     inCompleteTodo(id).then((response) => {
    //         listTodos();
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Todos</h2>
            {
                isAdmin &&
                <button className='btn btn-primary mb-2' onClick={addNewService}>Create Service</button>
            }
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Service Id</th>
                            <th>Service Name</th>
                            <th>Service Description</th>
                            <th>Service Creation Time</th>
                            <th>Service Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            service.map(service =>
                                <tr key={service.id}>
                                    <td>{service.id}</td>
                                    <td>{service.serviceName}</td>
                                    <td>{service.description}</td>
                                    <td>{service.createdDatetime}</td>
                                    <td>{service.isActive ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateService(service.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeService(service.id)} style={{ marginLeft: "10px" }} >Delete</button>
                                        <button className='btn btn-success' onClick={() => markCompleteService(service.id)} style={{ marginLeft: "10px" }} >Active</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ServiceMasterComponent