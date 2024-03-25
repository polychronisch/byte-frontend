import { Button,Table } from "react-bootstrap";
import axios from 'axios';
import Candidate from "./Candidate";
import { useEffect,useState } from "react";

export default function CandidatesTable(){
    const [candidates, setCandidates] = useState([])
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const deleteCandidate = async(id)=>{
        try {
            const response = await axios.post('http://localhost:8000/api/delete-candidate/'+id);
            console.log(response);
            // Optionally, you can handle success response here
        } catch (error) {
            // console.error(error.response.data);
            // Optionally, you can handle error response here
        }
    }
    const showCandidate = (id) => {
        setSelectedCandidate(id)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/candidates');
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCandidates(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
        fetchData();
    }, []); 
    return(
        <>
            {
            selectedCandidate ? (
                <Candidate selectedCandidate = {selectedCandidate} />
            ):(
                <Table  bordered hover className="mt-3">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Degree</th>
                            <th>Resume</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate)=>{
                            return(
                            <tr>
                                <td>{candidate.lastName}</td>
                                <td>{candidate.firstName}</td>
                                <td>{candidate.email}</td>
                                <td>{candidate.degreeTitle}</td>
                                <td>{candidate.resume}</td>
                                <td>
                                    <Button variant="success" onClick={ () =>showCandidate(candidate.id)}>Edit</Button>
                                    <Button variant="danger" className="mx-2" onClick={ () => deleteCandidate(candidate.id)}>Delete</Button>
                                </td>
                            </tr>
                            )
                            
                        })}
                        
                    </tbody>
                </Table>
            )
        }
        
        </>
        
    )
}



