import { useEffect, useState } from 'react'

import { getAllService, deleteService, setIsActive } from '../services/ServiceMaster'
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
        navigate('/add-services')

    }

    function updateService(id) {
        console.log(id)
        navigate(`/update-service/${id}`)
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

    function createLocation(id) {
        setIsActive(id).then((response) => {
            listServices()
        }).catch(error => {
            console.error(error)
        })
    }

    const formatDate = (dateTimeString) => {
        if (!dateTimeString) {
          return ''; // Handle null or undefined values
        }
      
        const date = new Date(dateTimeString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      };
      

    // function markInCompleteTodo(id){
    //     inCompleteTodo(id).then((response) => {
    //         listTodos();
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Services</h2>
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
                            <th> Description</th>
                            <th> Creation Time</th>
                            <th> Updation Time</th>
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
                                    <td>{formatDate(service.createdDatetime)}</td>
                                    <td>{formatDate(service.updatedDatetime)}</td>
                                    <td>{service.isActive ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateService(service.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeService(service.id)} style={{ marginLeft: "10px" }} >Delete</button>
                                        <button className='btn btn-success' onClick={() => markCompleteService(service.id)} style={{ marginLeft: "10px" }} >Active</button>
                                        <button className='btn btn-warning' onClick={() => createLocation(service.id)} style={{ marginLeft: "10px" }} >Create</button>
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