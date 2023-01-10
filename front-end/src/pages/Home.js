import Footer from './Footer.js'
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import './Home.css';

const Home =() => {
      // render results
  return (
    <>
    <div className="container">
        <div className="Photo">
            <img style={{ width: 1280, height: 512 }} src="https://brunswickforest.com/wpc/uploads/2016/03/pickleball_2.jpg" alt="court"/>
        </div>
        <div className="Heading">
            <h1>Welcome to Pickle Ballerzz</h1>
        </div>
        <div className="Info">
            <p>We are the newest and largest facility in the pickle ball industry. Our facilty contains 25 courts (15 indoor and 10 outdoor)
            to be able to enjoy the magnificent sport of pickle ball year-round. We teach classes several times a week to elevate the level
            of play amongst ballerzz of all ages. We hold multiple highly competitive singles and doubles tournamnet for large cash prizes. 
            We event rent out the space for parties or third party tournaments. Feel free to walk in anytime or make a reservation to ensure
            that you have a fantastic time with us. You can a reservation down below! We look forward to seeing you on the court.</p>
        </div>
        <div className="Button">
            <Link to="/reservations">
                <Button variant="success">Make a Reservation</Button>
            </Link>
        </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;