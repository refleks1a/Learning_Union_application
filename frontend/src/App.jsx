import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import QuestionsPage from "./pages/QuestionsPage"


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
          </Routes>
          <Routes>
            <Route path='/questions/all' element={<QuestionsPage/>}></Route>
          </Routes>
        </main>
        <Footer/>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
