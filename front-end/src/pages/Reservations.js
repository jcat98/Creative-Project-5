import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import emailjs from "emailjs-com";
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer.js'
import './Reservations.css';

const Reservations =() => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [time, setTime] = useState("");
    const [size, setSize] = useState("");
    const [notes, setNotes] = useState("");
    
  const createReservation = async() => {
    try {
      await axios.post("/api/reservations", {first_name: first_name, last_name: last_name, email: email,
      phone: phone, month: month, day: day, year: year, time: time, size: size, notes: notes});
    } catch(error) {
      setError("error adding a reservation: " + error);
    }
  }
  
  const addReservation = async(e) => {
    console.log("in the add call on the front end");
    e.preventDefault();
    await createReservation();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMonth("");
    setDay("");
    setYear("");
    setTime("");
    setSize("");
    setNotes("");
  }
  
    const form = useRef();
    
    const sendEmail = (e) => {
        console.log("in the send email function");
        console.log(e.target.value);
        e.preventDefault();

        emailjs.sendForm('service_oxtc3pq', 'template_dw998fd', form.current, '72lH51fEMzF6yMJSZ')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          form.current.reset();
    };
    
    const handleSubmit = (e) => {
      addReservation(e);
      sendEmail(e);
    };

    return (
    <>
    {error}
    <div className="container">
        <div className="App">
            <h2>Reservations</h2>
            <p>The duration of every reservation is 30 minutes. You are limited to 2 reservations a day. Reservations groups must be a minimum of 2 people and a maximum of 4 people.</p>
            <hr></hr>
            
    <Form ref={form} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="John" name="first_name" value={first_name} onChange={e=>setFirstName(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Doe" name="last_name" value={last_name} onChange={e=>setLastName(e.target.value)}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="john@example.com" name="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="phone" placeholder="(123) 456-7890" value={phone} onChange={e=>setPhone(e.target.value)}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridMonth">
          <Form.Label>Month</Form.Label>
          <Form.Control as="select" value={month} onChange={e=>setMonth(e.target.value)} name="month">
            <option>Month...</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDay">
          <Form.Label>Day</Form.Label>
          <Form.Control as="select" value={day} onChange={e=>setDay(e.target.value)} name="day">
            <option>Day...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>   
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </Form.Control>
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridYear">
          <Form.Label>Year</Form.Label>
          <Form.Control as="select" value={year} onChange={e=>setYear(e.target.value)} name="year">
            <option>Year...</option>
            <option value="2022">2022</option>
          </Form.Control>
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridTime">
          <Form.Label>Time</Form.Label>
          <Form.Control as="select" value={time} onChange={e=>setTime(e.target.value)} name="time">
            <option>Time...</option>
            <option value="7:00am">7:00am</option>
            <option value="7:30am">7:30am</option>
            <option value="8:0am">8:00am</option>
            <option value="8:30am">8:30am</option>
            <option value="9:00am">9:00am</option>
            <option value="9:30am">9:30am</option>
            <option value="10:00am">10:00am</option>
            <option value="10:30am">10:30am</option>
            <option value="11:00am">11:00am</option>
            <option value="11:30am">11:30am</option>
            <option value="12:00pm">12:00pm</option>
            <option value="12:30pm">12:30pm</option>
            <option value="1:00pm">1:00pm</option>
            <option value="1:30pm">1:30pm</option>
            <option value="2:00pm">2:00pm</option>
            <option value="2:30pm">2:30pm</option>
            <option value="3:00pm">3:00pm</option>
            <option value="3:30pm">3:30pm</option>
            <option value="4:00pm">4:00pm</option>
            <option value="4:30pm">4:30pm</option>
            <option value="5:00pm">5:00pm</option>
            <option value="5:30pm">5:30pm</option>
            <option value="6:00pm">6:00pm</option>
            <option value="6:30pm">6:30pm</option>
            <option value="7:00pm">7:00pm</option>
            <option value="7:30pm">7:30pm</option>
            <option value="8:00pm">8:00pm</option>
            <option value="8:30pm">8:30pm</option>
            <option value="9:00pm">9:00pm</option>
            <option value="9:30pm">9:30pm</option>
            <option value="10:00pm">10:00pm</option>
            <option value="10:30pm">10:30pm</option>
          </Form.Control>
        </Form.Group>
    </Row>
    
    <Row>
        <Form.Group as={Col} controlId="formGridSize">
            <Form.Label>Group Size</Form.Label>
            <Form.Select value={size} onChange={e=>setSize(e.target.value)} name="size">
                <option>Size...</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </Form.Select>
        </Form.Group>
    </Row>
     
    <Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} value={notes} onChange={e=>setNotes(e.target.value)}/>
        </Form.Group>
    </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    </div>
    <Footer/>
    </>
  );
}

export default Reservations ;