import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Candidates from './views/Candidates'
function App() {
  return (
    <div className="App">
      <header class='container-fluid'>
        <h1> Candidates' CVs</h1>
      </header>
      <main className='container-fluid'>
        <Candidates />
      </main>
      <footer>
        <h6>Assignment implemented by Polychronis Charalampidis</h6> 
      </footer>
    </div>
  );
}

export default App;
