import { useState,useEffect } from "react";
import { Button, Stack,Table } from "react-bootstrap"
import axios from 'axios';

export default function Degrees(){
    const [degrees,setDegrees] = useState([])
    const [degreesUsed,setDegreesUsed] = useState([])
    const deleteCandidate = async(id)=>{
        try {
            const response = await axios.post('http://localhost:8000/api/delete-degree/'+id);
            
            // Optionally, you can handle success response here
        } catch (error) {
            // console.error(error.response.data);
            // Optionally, you can handle error response here
        }
        window.location.reload();
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/degrees');
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDegrees(data.degrees);
                setDegreesUsed(data.degrees_used)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
        fetchData();
    }, []); 
    return(
        <Stack>
            <Table className="degrees-table">
                <thead>
                    <tr>
                        <th>Degree Name</th>
                    </tr>
                </thead>
                <tbody>
                    {degrees.map((degree)=>{
                        return(
                            <tr>
                                <td> 
                                    <p>{degree.degreeTitle}</p>
                                    {!degreesUsed.some(item => item.degree_id === degree.id) && ( 
                                        <Button variant='danger' onClick={ () => deleteCandidate(degree.id)}>Delete</Button>
                                    )}
                                </td>
                            </tr>
                        )
                        
                    })}
                    
                </tbody>
            </Table>
        </Stack>
    )
}