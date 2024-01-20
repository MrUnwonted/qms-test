import { useEffect } from 'react'
import { useState } from 'react'
import { getScreen, updateScreen, addScreen } from '../../services/ScreenMaster'
import { getAllCounter } from '../../services/CounterMaster'
import { useNavigate, useParams } from 'react-router-dom'

const ScreenComponent = () => {

    const [screenName, setScreenName] = useState('')
    const [description, setDescription] = useState('')
    const [counter, setCounter] = useState(null);  // Initialize service state as null
    const [selectedCounterID, setSelectedCounterID] = useState('');
    const [counterOptions, setCounterOptions] = useState([])

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        listCounters();
    }, [])

    function listCounters() {
        getAllCounter().then((response) => {
            setCounterOptions(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

 
    const handleCounterChange = (e) => {
        const selectedId = e.target.value;
        console.log('Selected ID:', selectedId);

        setSelectedCounterID(selectedId);

        // Ensure that the structure of locationOptions is correct
        const selectedCounter = counterOptions.find(s => s.id === Number(selectedId));

        console.log('Selected Counter:', selectedCounter);
        setCounter(selectedCounter);
    };




    function saveOrUpdateScreen(e) {
        e.preventDefault();

        const currentDate = new Date();

        console.log('Selected Counter:', counter); 

        const screen = {
            screenName,
            counterId: counter ? counter.id : null,
            description,
            createdDatetime: currentDate.toISOString(),
            updatedDatetime: id ? currentDate.toISOString() : null,
            createdBy: 2,
        };

        console.log('Counter:', screen); // Add this log

        if (id) {
            updateScreen(id, screen)
                .then(() => {
                    navigate('/screens');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            addScreen(screen)
                .then(response => {
                    console.log(response.data);
                    navigate('/screens');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }


    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Screen</h2>
        } else {
            return <h2 className='text-center'>Add Screen</h2>
        }
    }

    useEffect(() => {

        if (id) {
            getScreen(id).then((response) => {
                setScreenName(response.data.screenName)
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
                                <label className='form-label'>Screen Name:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Screen Name'
                                    name='name'
                                    value={screenName}
                                    onChange={(e) => setScreenName(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Screen Description:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Screen Description'
                                    name='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>
                            </div>

                        {!id &&
                            <div className='form-group mb-2'>
                                <label htmlFor="counter" className="form-label">Counter Mapping:</label>
                                <div className="mb-3">

                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="counter"
                                        value={selectedCounterID}
                                        onChange={handleCounterChange}
                                        required
                                    >
                                        <option value="" disabled hidden>Select Counter</option>
                                        {counterOptions.map((counter) => (
                                            <option key={counter.id} value={counter.id}>
                                                {counter.counterName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>}


                            <button className='btn btn-success' onClick={(e) => saveOrUpdateScreen(e)}>Submit</button>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ScreenComponent