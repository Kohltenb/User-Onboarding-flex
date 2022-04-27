import logo from './logo.svg';
import './App.css';
import Form from './components/form'
import React, {useState} from 'react'
import schema from './validation/formSchema'
import * as yup from 'yup'
import axios from 'axios';


const intialFormValues = {
  username: '',
  password: '',
  email: '',
  tos: false,
}

const intialFormErrors = {
  username: '',
  password: '',
  email: '',
  tos: ''
}


function App() {
  const [formValues, setFormValues] = useState(intialFormValues)
  const [formErrors, setFormErrors] = useState(intialFormErrors)
  const [users, setUsers] = useState([]);
  
  
  const handleSubmit = () => {
    axios.post('https://reqres.in/api/users', formValues)
    .then(res => {
      //console.log(res)
      setUsers([res.data, ...users])
    })
    .catch(err => console.error(err))
    .finally(() => setFormValues(intialFormValues))
  }
  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({...formErrors, [name]: ''}))
    .catch(err => setFormErrors({...formErrors, [name]: err.errors[0] }))
  }

  const handleChange = (name, value) => {
    validate(name, value)
    setFormValues({...formValues, [name]: value})
  }

  return (
    <div className="App">
      <Form 
       values={formValues}
       change={handleChange}
       errors={formErrors}
       submit={handleSubmit}
      />
      {users.map(user =>(
        <div key={user.id}>
          <p>{user.createdAt}</p>
          <p>{user.email}</p>

        </div>
      ))}
    </div>
  );
}

export default App;
