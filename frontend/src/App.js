import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.js'
import Create from './components/Create.js'
import Read from './components/Read'
import Update from './components/Update.js'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      {/* <h1>ToDo Application</h1> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/read/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
