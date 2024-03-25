import { Button,Form } from "react-bootstrap"
import axios from 'axios';
import { useEffect,useState} from "react";


const Candidate = ({selectedCandidate}) => {
    const [candidate,setCandidate] = useState({})
    const [degrees,setDegrees] = useState([])
    
    const handleChange = (e) => {
        setCandidate({ ...candidate, [e.target.name]: e.target.value });
        
    };
    const showCandidate = async()=>{
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:8000/api/show-candidate/'+selectedCandidate);
                setCandidate(response.data)
                const response_d = await fetch('http://localhost:8000/api/degrees');
                if (!response_d.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await response_d.json();
                setDegrees(data.degrees);
            } catch (error) {
                // console.error(error.response.data);
                // Optionally, you can handle error response here
            }
            };
        fetchData();
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://localhost:8000/api/update-candidate/'+selectedCandidate, candidate );
            // Optionally, you can handle success response here
        } catch (error) {
            // console.error(error.response.data);
            // Optionally, you can handle error response here
        }
    };

    const backToTable = () => {
        selectedCandidate = null;
    }
    useEffect(() => {
        showCandidate()
    }, []); 
    return(
        <>
            <Form className="my-3 px-5" onSubmit={handleSubmit} enctype="multipart/form-data">
                <Form.Group className="my-1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" value={candidate.lastName} onChange={handleChange}  type="text" placeholder="Enter Last Name" />
                </Form.Group> 
                <Form.Group className="my-1">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" value={candidate.firstName} onChange={handleChange}  type="text" placeholder="Enter First Name" />
                </Form.Group> 
                <Form.Group className="my-1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={candidate.email} onChange={handleChange}  type="email" placeholder="Enter email" />
                </Form.Group> 
                <Form.Group className="my-1">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control name="mobile" value={candidate.mobile} onChange={handleChange} type="text" placeholder="Enter phone number" />
                </Form.Group> 
                <Form.Group className="my-1">
                    <Form.Label>Degree</Form.Label>
                    <Form.Select name="degree_id" value={candidate.degree_id} onChange={handleChange} >
                        {degrees.map((degree) => (
                            <option key={degree.id} value={degree.id}>{degree.degreeTitle}</option>
                        ))}
                        </Form.Select>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload your CV</Form.Label>
                    <Form.Control name="resume" value={candidate.resume} onChange={handleChange}  accept=".pdf" />
                </Form.Group>
                <Button className='byte-button' type="submit">
                    Submit
                </Button>
                <Button onClick={backToTable}>Back</Button>
            </Form>
            
        </>
    )
}
    
export default Candidate;