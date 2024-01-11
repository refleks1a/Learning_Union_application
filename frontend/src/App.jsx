import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header"
import Footer from "./components/Footer"
import NotFound from "./components/NotFound";
import HomePage from "./pages/HomePage"
import QuestionsPage from "./pages/QuestionsPage"


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/questions/all' element={<QuestionsPage/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
          <ToastContainer theme='dark'/>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
