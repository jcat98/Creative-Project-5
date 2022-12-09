import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Footer from './Footer.js'
import './Users.css';

const Users =() => {
  // setup state
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [place, setPlace] = useState("");

  const fetchUsers = async() => {
    try {      
      const response = await axios.get("/api/users");
      setUsers(response.data.users);
    } catch(error) {
      setError("error retrieving users: " + error);
    }
  }
  const createUser = async() => {
    try {
      await axios.post("/api/users", {username: username, place: place});
    } catch(error) {
      setError("error adding a user: " + error);
    }
  }
  const deleteOneUser = async(user) => {
    try {
      await axios.delete("/api/users/" + user.id);
    } catch(error) {
      setError("error deleting a user" + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchUsers();
  },[]);

  const addUser = async(e) => {
    e.preventDefault();
    await createUser();
    fetchUsers();
    setUsername("");
    setPlace("");
  }

  const deleteUser = async(user) => {
    await deleteOneUser(user);
    fetchUsers();
  }

  // render results
  return (
    <>
    <div className="container">
        <div className="App">
            {error}
            <h1>Users</h1>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Place</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map( user => (
                  <tr>
                    <td>{user.username}</td>
                    <td>{user.place}</td>
                    <td><Button className="float-end" variant="primary" onClick={e => deleteUser(user)}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <h1>Create a User</h1>
            <form onSubmit={addUser}>
            <Card>
                <Card.Header>User</Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Secret Identity" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Place</Form.Label>
                        <Form.Control type="text" value={place} onChange={e=>setPlace(e.target.value)} placeholder="State" />
                    </Form.Group>
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

export default Users;