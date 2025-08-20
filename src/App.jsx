import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/home/Home';
import Footer from './components/Footer';
import CourseDetails from './pages/courses/CourseDetails';
import CoursesPage from './pages/courses/CoursesPage';
import AboutPage from './pages/about/AboutPage';
import Gallery from './pages/gallery/Gallery';
import TeamPage from './pages/team/TeamPage';

function App() {

  return (
    <Router>
      <Navbar />


      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about-us' element={<AboutPage />}></Route>
        <Route path='/gallery' element={<Gallery />}></Route>
        <Route path='/management' element={<TeamPage />}></Route>
        <Route path='/courses' element={<CoursesPage />}></Route>
        <Route path='/courses/:courseName' element={<CourseDetails />}></Route>
      </Routes>

      <Footer />

    </Router >
  )
}

export default App
