import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Footer from './Footer.js'
import './Feed.css';

const Home =() => {
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
    console.log("in the delete one rant method in the front end")
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
    console.log("in the front end delete rant method")
    await deleteOneRant(rant);
    fetchRants();
  }

  // render results
  return (
    <>
    <div className="container">
        <div className="App">
            {error}
            <h1>Feed</h1>
          
            {rants.map( rant => (
                <Card key={rant.id} className="rant">
                  <Card.Header>{rant.username}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {rant.problem}
                    </Card.Text>
                    <Button className="float-end" variant="primary" onClick={e => deleteRant(rant)}>Delete</Button>
                  </Card.Body>
                </Card>
            ))}
        </div>
    </div>
    <Footer/>
    </>
  );
}

export default Home;
