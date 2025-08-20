import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/home/Home';
import Footer from './components/Footer';
import CourseDetails from './pages/courses/CourseDetails';

function App() {

  return (
    <Router>
      <Navbar />


      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/courses' element={<CourseDetails />}></Route>
        <Route path='/courses/:courseName' element={<CourseDetails />}></Route>
      </Routes>

      <Footer />

    </Router >
  )
}

export default App
