import { useEffect, useState } from 'react'
import { getAllLocation, setIsActive } from '../../services/LocationMaster'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../../services/AuthService'

const LocationMasterComponent = () => {

    const [location, setLocation] = useState([])

    const navigate = useNavigate()

    const isAdmin = isAdminUser();


    useEffect(() => {
        listLocations();
    }, [])

    function listLocations() {
        getAllLocation().then((response) => {
            setLocation(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewLocation() {
        navigate('/add-location')

    }

    function updatelocation(id) {
        console.log(id)
        navigate(`/update-location/${id}`)
    }

    // function removelocation(id) {
    //     deleteLocation(id).then(() => {
    //         listLocations();
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }

    function makeActiveOrInactive(id) {
        setIsActive(id).then(() => {
            listLocations()
        }).catch(error => {
            console.error(error)
        })
    }

    function viewLocation() {
        navigate('/locations')
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
            <h2 className='text-center'>List of Locations</h2>
            {
                isAdmin &&
                <button className='btn btn-primary mb-2' onClick={addNewLocation}>Create Location</button>
            }
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Location Name</th>
                            <th> Description</th>
                            <th> Creation Time</th>
                            <th> Mapped Table</th>
                            <th>Service Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            location.map(location =>
                                <tr key={location.id}>
                                    <td>{location.id}</td>
                                    <td>{location.locationName}</td>
                                    <td>{location.description}</td>
                                    <td>{formatDate(location.createdDatetime)}</td>
                                    <td>{location.serviceId}</td>
                                    <td>{location.isActive ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updatelocation(location.id)}>Update</button>
                                        {/* <button className='btn btn-danger' onClick={() => removelocation(location.id)} style={{ marginLeft: "10px" }} >Delete</button> */}
                                        <button className='btn btn-success' onClick={() => makeActiveOrInactive(location.id)} style={{ marginLeft: "10px" }} >Active</button>
                                        <button className='btn btn-warning' onClick={() => viewLocation(location.id)} style={{ marginLeft: "10px" }} >Create</button>
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

export default LocationMasterComponent