import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Home from './pages/home/Home';
import Footer from './components/Footer';
import CourseDetails from './pages/courses/CourseDetails';
import CoursesPage from './pages/courses/CoursesPage';
import AboutPage from './pages/about/AboutPage';
import Gallery from './pages/gallery/Gallery';
import TeamPage from './pages/team/TeamPage';
import ContactPage from './pages/contact/ContactPage';
import BlogPage from './pages/blog/BlogPage';
import BlogDetailPage from './pages/blog/BlogDetailPage';
import StudentRegistrationPage from './pages/registration/StudentRegistrationPage';
import ScrollToTopButton from './components/ScrollToTopButton';
import AdminPanelPage from './admin/AdminPanelPage';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable 
        pauseOnHover
      />
      {!isAdminRoute ? <Navbar /> : null}

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about-us' element={<AboutPage />}></Route>
        <Route path='/gallery' element={<Gallery />}></Route>
        <Route path='/management' element={<TeamPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/apply' element={<StudentRegistrationPage />}></Route>
        <Route path='/blog' element={<BlogPage />}></Route>
        <Route path='/blog/:blogName' element={<BlogDetailPage />}></Route>
        <Route path='/courses' element={<CoursesPage />}></Route>
        <Route path='/courses/:courseName' element={<CourseDetails />}></Route>
        <Route path='/admin' element={<AdminPanelPage />}></Route>
      </Routes>

      {!isAdminRoute ? <Footer /> : null}
      {!isAdminRoute ? <ScrollToTopButton /> : null}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router >
  )
}

export default App
