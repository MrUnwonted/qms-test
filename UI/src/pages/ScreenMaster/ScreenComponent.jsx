import { useEffect } from 'react'
import { useState } from 'react'
import { getCounter, updateCounter, addCounter } from '../../services/CounterMaster'
import { getAllLocation } from '../../services/LocationMaster'
import { useNavigate, useParams } from 'react-router-dom'

const ScreenComponent = () => {

    const [counterName, setCounterName] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState(null);  // Initialize service state as null
    const [selectedLocationID, setSelectedLocationId] = useState('');
    const [locationOptions, setLocationOptions] = useState([])

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        listLocations();
    }, [])

    function listLocations() {
        getAllLocation().then((response) => {
            setLocationOptions(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

 
    const handleLocationChange = (e) => {
        const selectedId = e.target.value;
        console.log('Selected ID:', selectedId);

        setSelectedLocationId(selectedId);

        // Ensure that the structure of locationOptions is correct
        const selectedLocation = locationOptions.find(s => s.id === Number(selectedId));

        console.log('Selected Location:', selectedLocation);
        setLocation(selectedLocation);
    };




    function saveOrUpdateCounter(e) {
        e.preventDefault();

        const currentDate = new Date();

        console.log('Selected Location:', location); 

        const counter = {
            counterName,
            locationId: location ? location.id : null,
            description,
            createdDatetime: currentDate.toISOString(),
            updatedDatetime: id ? currentDate.toISOString() : null,
            createdBy: 2,
        };

        console.log('Counter:', counter); // Add this log

        if (id) {
            updateCounter(id, counter)
                .then(() => {
                    navigate('/counters');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            addCounter(counter)
                .then(response => {
                    console.log(response.data);
                    navigate('/counters');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }


    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Counter</h2>
        } else {
            return <h2 className='text-center'>Add Counter</h2>
        }
    }

    useEffect(() => {

        if (id) {
            getCounter(id).then((response) => {
                setCounterName(response.data.counterName)
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
                                <label className='form-label'>Counter Name:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Counter Name'
                                    name='name'
                                    value={counterName}
                                    onChange={(e) => setCounterName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Counter Description:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Counter Description'
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>
                            </div>

                        {!id &&
                            <div className='form-group mb-2'>
                                <label htmlFor="location" className="form-label">Location Mapping:</label>
                                <div className="mb-3">

                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="location"
                                        value={selectedLocationID}
                                        onChange={handleLocationChange}
                                        required
                                    >
                                        <option value="" disabled hidden>Select Location</option>
                                        {locationOptions.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.locationName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>}


                            <button className='btn btn-success' onClick={(e) => saveOrUpdateCounter(e)}>Submit</button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ScreenComponent