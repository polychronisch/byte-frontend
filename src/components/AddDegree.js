import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function AddDegree(){
    const [formData, setFormData] = useState({
        degreeTitle: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/submit-degree', formData);
            console.log(response);
            // Optionally, you can handle success response here
        } catch (error) {
            // console.error(error.response.data);
            // Optionally, you can handle error response here
        }
    };
    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="my-1">
                <Form.Label>DegreeTitle</Form.Label>
                <Form.Control name="degreeTitle" value={formData.degreeTitle} onChange={handleChange} type="text" placeholder="Enter A New Degree" />
            </Form.Group> 
            <Button className='byte-button my-3' type="submit">
                Add the Degree
            </Button>
        </Form>
    )
}