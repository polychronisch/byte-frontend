import {Button,Form} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function AddCandidate(){
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        mobile: '',
        degree_id: 1,
        resume: '',
        jobAppliedFor: []
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    };
    const [degrees,setDegrees] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/degrees');
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDegrees(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
        fetchData();
    }, []); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/submit-candidate', formData);
            console.log(response);
            // Optionally, you can handle success response here
        } catch (error) {
            // console.error(error.response.data);
            // Optionally, you can handle error response here
        }
    };

    return(
        <Form className="my-3 px-5" onSubmit={handleSubmit} enctype="multipart/form-data">
            <Form.Group className="my-1">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Enter Last Name" />
            </Form.Group> 
            <Form.Group className="my-1">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="Enter First Name" />
            </Form.Group> 
            <Form.Group className="my-1">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Enter email" />
            </Form.Group> 
            <Form.Group className="my-1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control name="mobile" value={formData.mobile} onChange={handleChange}type="text" placeholder="Enter phone number" />
            </Form.Group> 
            <Form.Group className="my-1">
                <Form.Label>Degree</Form.Label>
                <Form.Select name="degree_id" value={formData.degree_id} onChange={handleChange}>
                    {degrees.map((degree) => (
                        <option key={degree.id} value={degree.id}>{degree.degreeTitle}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload your CV</Form.Label>
                <Form.Control type="file" name="resume" value={formData.resume} onChange={handleChange} accept=".pdf" />
            </Form.Group>
            <Button className='byte-button' type="submit">
                Submit
            </Button>
        </Form>
    )
}   

