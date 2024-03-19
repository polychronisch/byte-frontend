import { useState } from "react";
import { Stack,Button } from "react-bootstrap";
import CandidatesTable from "../components/CandidatesTable";
import AddCandidate from '../components/AddCandidate'
import Degrees from '../components/Degrees'
import AddDegree from '../components/AddDegree'
function Candidates (){
    const [view, setView] = useState('add')
    const changeView = (current_view) => {
        setView(current_view);
    }
    
    return(
        <>
            <Stack direction="horizontal" className='justify-content-between'>
                <Stack direction="horizontal" gap={4} className='justify-content-center'>
                    <Button className="byte-button" onClick={() => { changeView('candidates') }} >
                        Show Candidates
                    </Button>
                    <Button className="byte-button" onClick={() => { changeView('add') }} >
                        Add Candidate
                    </Button>
                </Stack>
                <Stack direction="horizontal" gap={4} className='justify-content-center'>
                    <Button className="byte-button" onClick={() => { changeView('degrees') }} >
                        Show Degrees
                    </Button>
                    <Button className="byte-button" onClick={() => { changeView('add-degrees') }} >
                        Add Degree
                    </Button>
                </Stack>
                
            </Stack>
            {
                view==='candidates' && (
                    <CandidatesTable />
                )
            }
            {
                view==='add' && (               
                <AddCandidate />
                )
            }
            {
                view==='degrees' && (
                    <Degrees />
                )
            }
            {
                view==='add-degrees' && (
                    <AddDegree />
                )
            }
        </>
        
    )
}

export default Candidates;