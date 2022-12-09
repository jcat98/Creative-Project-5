import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Footer from './Footer.js'
import './Rant.css';

const Rant =() => {
  // setup state
  const [rants, setRants] = useState([]);
  const [error, setError] = useState("");
  const [problem, setProblem] = useState("");
  const [username, setUsername] = useState("");
  const [place, setPlace] = useState("");
  const [users, setUsers] = useState([]);

  const fetchRants = async() => {
    try {      
      const response = await axios.get("/api/rants");
      setRants(response.data.rants);
    } catch(error) {
      setError("error retrieving rants: " + error);
    }
  }
  const createRant = async() => {
    try {
      await axios.post("/api/rants", {problem: problem, username: username, place: place});
    } catch(error) {
      setError("error adding a rant: " + error);
    }
  }
  const deleteOneRant = async(rant) => {
    try {
      await axios.delete("/api/rants/" + rant.id);
    } catch(error) {
      setError("error deleting a rant" + error);
    }
  }
  
  const fetchUsers = async() => {
    try {      
      const response = await axios.get("/api/users");
      setUsers(response.data.users);
    } catch(error) {
      setError("error retrieving users: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchRants();
    fetchUsers();
  },[]);

  const addRant = async(e) => {
    e.preventDefault();
    await createRant();
    fetchRants();
    setProblem("");
    setUsername("");
    setPlace("");
  }

  const deleteRant = async(rant) => {
    await deleteOneRant(rant);
    fetchRants();
  }

  // render results
  return (
    <>
    <div className="container">
        <div className="App">
            {error}
            <h1>Create a Rant</h1>
            <form onSubmit={addRant}>
            <Card>
                <Card.Header>Rant</Card.Header>
                <Card.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3}  value={problem} onChange={e=>setProblem(e.target.value)}/>
                        </Form.Group>
                        <Form.Select aria-label="Default select example" onChange={e=>setUsername(e.target.value)}>
                          <option>Select User</option>
                          {users.map( user => (
                            <option value={user.username}>{user.username}</option>
                          ))}
                        </Form.Select>
                    <Button className="float-end" type="submit" variant="primary">Submit</Button>
                </Card.Body>
            </Card>
            </form>
        </div>
    </div>
    <Footer/>
    </>
  );
}

export default Rant;