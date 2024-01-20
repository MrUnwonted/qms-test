import { useEffect, useState } from 'react'
import { getAllCounter, setIsActive } from '../../services/CounterMaster'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../../services/AuthService'
import { getLocation } from '../../services/LocationMaster'
import Loading from '../../components/Loading'

const CounterMasterComponent = () => {

    const [counter, setCounter] = useState([])

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const isAdmin = isAdminUser();


    useEffect(() => {
        listCounters();
    }, [])

    // function listCounters() {
    //     getAllCounter().then((response) => {
    //         setCounter(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }

    async function listCounters() {
        try {
            setLoading(true);
            const response = await getAllCounter();
            const countersWithLocationNames = await Promise.all(
                response.data.map(async (counter) => {
                    const locationName = await fetchLocationName(counter.locationId);
                    return { ...counter, locationName };
                })
            );
            setCounter(countersWithLocationNames);
        } catch (error) {
            console.error(error);
            setError('Error fetching locations'); // Set an appropriate error message
        } finally {
            setLoading(false);
        }
    }


    function addNewCounter() {
        navigate('/add-counter')

    }

    function updateCounter(id) {
        console.log(id)
        navigate(`/update-counter/${id}`)
    }

    // function removeCounter(id) {
    //     deleteCounter(id).then(() => {
    //         listCouneters();
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }

    function makeActiveOrInactive(id) {
        setIsActive(id).then(() => {
            listCounters()
        }).catch(error => {
            console.error(error)
        })
    }

    function viewCounters() {
        navigate('/counters')
    }

    const formatDate = (dateTimeString) => {
        if (!dateTimeString) {
          return ''; // Handle null or undefined values
        }
      
        const date = new Date(dateTimeString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
      };
      
      const fetchLocationName = async (locationId) => {
        try {
            const response = await getLocation(locationId);
            return response.data.locationName;
        } catch (error) {
            console.error(error);
            return 'N/A';
        }
    };

    if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Loading />
          </div>
        );
      }

    if (error) {
        return <p>Error: {error}</p>;
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
            <h2 className='text-center'>List of Counters</h2>
            {
                isAdmin &&
                <button className='btn btn-primary mb-2' onClick={addNewCounter}>Create Counter</button>
            }
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Counter Name</th>
                            <th> Description</th>
                            <th> Creation Time</th>
                            <th> Mapped Table</th>
                            <th>Counter Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            counter.map(counter =>
                                <tr key={counter.id}>
                                    <td>{counter.id}</td>
                                    <td>{counter.counterName}</td>
                                    <td>{counter.description}</td>
                                    <td>{formatDate(counter.createdDatetime)}</td>
                                    <td>{counter.locationName}</td>
                                    <td>{counter.isActive ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateCounter(counter.id)}>Update</button>
                                        {/* <button className='btn btn-danger' onClick={() => removeCounter(counter.id)} style={{ marginLeft: "10px" }} >Delete</button> */}
                                        <button className='btn btn-success' onClick={() => makeActiveOrInactive(counter.id)} style={{ marginLeft: "10px" }} >Active</button>
                                        <button className='btn btn-warning' onClick={() => viewCounters(counter.id)} style={{ marginLeft: "10px" }} >Create</button>
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

export default CounterMasterComponent