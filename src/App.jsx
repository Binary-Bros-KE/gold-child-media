import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/home/Home';

function App() {

  return (
    <Router>
      <Navbar />


      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>


    </Router >
  )
}

export default App
