import { useEffect } from 'react'
import { useState } from 'react'
import { getLocation, updateLocation, addLocation } from '../../services/LocationMaster'
import { getAllService } from '../../services/ServiceMaster'
import { useNavigate, useParams } from 'react-router-dom'

const LocationComponent = () => {

    const [locationName, setLocationName] = useState('')
    const [description, setDescription] = useState('')
    const [service, setService] = useState(null);  // Initialize service state as null
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [serviceOptions, setServiceOptions] = useState([])

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        listServices();
    }, [])

    function listServices() {
        getAllService().then((response) => {
            setServiceOptions(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    // const handleServiceChange = (e) => {
    //     const selectedId = e.target.value;
    //     console.log('Selected ID:', selectedId); // Add this log
    //     setSelectedServiceId(selectedId);
    //     const selectedService = serviceOptions.find(s => s.id === selectedId);
    //     console.log('Selected Service:', selectedService); // Add this log
    //     setService(selectedService);
    // };
    const handleServiceChange = (e) => {
        const selectedId = e.target.value;
        console.log('Selected ID:', selectedId);

        setSelectedServiceId(selectedId);

        // Ensure that the structure of serviceOptions is correct
        const selectedService = serviceOptions.find(s => s.id === Number(selectedId));

        console.log('Selected Service:', selectedService);
        setService(selectedService);
    };




    function saveOrUpdateLocation(e) {
        e.preventDefault();

        const currentDate = new Date();

        console.log('Selected Service:', service); // Add this log

        const location = {
            locationName,
            serviceId: service ? service.id : null,
            description,
            createdDatetime: currentDate.toISOString(),
            updatedDatetime: id ? currentDate.toISOString() : null,
            createdBy: 2,
        };

       

        if (id) {
            updateLocation(id, location)
                .then(() => {
                    navigate('/locations');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            addLocation(location)
                .then(response => {
                    console.log(response.data);
                    navigate('/locations');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    const goBack = () => {
        navigate('/locations'); // Go back to the previous page
    };

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Location</h2>
        } else {
            return <h2 className='text-center'>Add Location</h2>
        }
    }

    useEffect(() => {

        if (id) {
            getLocation(id).then((response) => {
                console.log(response.data)
                setLocationName(response.data.locationName)
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
                                <label className='form-label'>Location Name:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Location Name'
                                    name='name'
                                    value={locationName}
                                    onChange={(e) => setLocationName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Location Description:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Location Description'
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>
                            </div>

                        {!id &&
                            <div className='form-group mb-2'>
                                <label htmlFor="service" className="form-label">Service Mapping:</label>
                                <div className="mb-3">

                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="service"
                                        value={selectedServiceId}
                                        onChange={handleServiceChange}
                                        required
                                    >
                                        <option value="" disabled hidden>Select Service</option>
                                        {serviceOptions.map((service) => (
                                            <option key={service.id} value={service.id}>
                                                {service.serviceName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>}


                            <button className='btn btn-success' onClick={(e) => saveOrUpdateLocation(e)}>Submit</button>
                            <button className='btn btn-secondary' onClick={goBack} style={{ marginLeft: '10px' }}>
                                Go Back
                            </button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default LocationComponent