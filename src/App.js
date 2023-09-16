// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './auth/SignIn'; 
import SignUp from './auth/SignUp'; 
import Todo from './todo/Todo'; 

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/todo" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
