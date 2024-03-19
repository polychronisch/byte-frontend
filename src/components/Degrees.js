import { useState,useEffect } from "react";
import { Stack,Table } from "react-bootstrap"
export default function Degrees(){
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
    return(
        <Stack>
            <Table>
                <thead>
                    <tr>
                        <th>Degree Name</th>
                    </tr>
                </thead>
                <tbody>
                    {degrees.map((degree)=>{
                        return(
                            <tr>
                                <td>{degree.degreeTitle}</td>
                            </tr>
                        )
                        
                    })}
                    
                </tbody>
            </Table>
        </Stack>
    )
}