import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Error from "./components/Error/Error";


const App = () => {
  const user=JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId="414227270193-l5b16jhf01skpsnrck66acf5s7ri7qu4.apps.googleusercontent.com">
    <Router>
      <Container maxWidth="xl">
      <Navbar />
        <Routes >
          <Route path="/"  element={<Navigate replace to="/posts"/>}/>
          <Route path="/posts" exact element={<Home/>}/>
          <Route path="/posts/search" exact element={<Home/>}/>
          <Route path="/posts/:id" element={<PostDetails/>}  />
          <Route path="/auth" exact element={!user ? <Auth/>:<Navigate replace to="/posts"/>}/>
          <Route path="*" element={<Error/>} />
        </Routes>
      </Container>
    </Router>
    </GoogleOAuthProvider>
  );
};
export default App;
