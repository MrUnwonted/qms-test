import { useEffect, useState } from 'react'
import { deleteScreen, getAllScreen, setIsActive } from '../../services/ScreenMaster'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../../services/AuthService'

const ScreenMasterComponent = () => {

    const [screen, setScreen] = useState([])

    const navigate = useNavigate()

    const isAdmin = isAdminUser();


    useEffect(() => {
        listScreens();
    }, [])

    function listScreens() {
        getAllScreen().then((response) => {
            setScreen(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewScreen() {
        navigate('/add-screen')

    }

    function updateScreen(id) {
        console.log(id)
        navigate(`/update-screen/${id}`)
    }

    //  function removeScreen(id){
    //         deleteScreen(id).then(() => {
    //             listScreens();
    //         }).catch(error => {
    //             console.error(error)
    //         })
    //     }

    function makeActiveOrInactive(id) {
        setIsActive(id).then(() => {
            listScreens()
        }).catch(error => {
            console.error(error)
        })
    }

    function viewsScreens() {
        navigate('/screens')
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
            <h2 className='text-center'>List of Screens</h2>
            {
                isAdmin &&
                <button className='btn btn-primary mb-2' onClick={addNewScreen}>Create Screen</button>
            }
            <div>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Screen Name</th>
                            <th> Description</th>
                            <th> Creation Time</th>
                            <th> Mapped Table</th>
                            <th>Screen Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            screen.map(screen =>
                                <tr key={screen.id}>
                                    <td>{screen.id}</td>
                                    <td>{screen.screenName}</td>
                                    <td>{screen.description}</td>
                                    <td>{formatDate(screen.createdDatetime)}</td>
                                    <td>{screen.counterId}</td>
                                    <td>{screen.isActive ? 'YES' : 'NO'}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateScreen(screen.id)}>Update</button>
                                        {/* <button className='btn btn-danger' onClick={() => removeScreen(screen.id)} style={{ marginLeft: "10px" }} >Delete</button> */}
                                        <button className='btn btn-success' onClick={() => makeActiveOrInactive(screen.id)} style={{ marginLeft: "10px" }} >Active</button>
                                        <button className='btn btn-warning' onClick={() => viewsScreens(screen.id)} style={{ marginLeft: "10px" }} >Create</button>
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

export default ScreenMasterComponent