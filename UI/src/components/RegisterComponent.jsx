import  { useState } from 'react'
import { registerAPICall } from '../services/AuthService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterComponent = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    

    function handleRegistrationForm(e){

        e.preventDefault();

        const register = {name, username, email, password,role}

        console.log(register);

        registerAPICall(register).then((response) => {
            console.log(response.data);
            toast.success('Registration successful!');
        }).catch(error => {
            console.error(error);
            toast.error('Registration failed. Please try again.');
        })
    }

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='text-center'> User Registration Form </h2>
                    </div>

                    <div className='card-body'>
                        <form>
                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Name </label>
                                <div className='col-md-9'>
                                    <input
                                        type='text'
                                        name='name'
                                        className='form-control'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={ (e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>
                            <ToastContainer position="bottom-right" autoClose={3000} />
                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Username </label>
                                <div className='col-md-9'>
                                    <input
                                        type='text'
                                        name='username'
                                        className='form-control'
                                        placeholder='Enter username'
                                        value={username}
                                        onChange={ (e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>


                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Email </label>
                                <div className='col-md-9'>
                                    <input
                                        type='text'
                                        name='email'
                                        className='form-control'
                                        placeholder='Enter email address'
                                        value={email}
                                        onChange={ (e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Password </label>
                                <div className='col-md-9'>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={ (e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Role </label>
                                <div className='col-md-9'>
                                    <input
                                        type='text'
                                        name='role'
                                        className='form-control'
                                        placeholder='Enter email address'
                                        value={role}
                                        onChange={ (e) => setRole(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className='form-group mb-3'>
                                <button className='btn btn-primary' onClick={ (e) => handleRegistrationForm(e)}>Submit</button>

                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>


    </div>
  )
}

export default RegisterComponent