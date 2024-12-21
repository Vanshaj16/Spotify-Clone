import "./output.css";
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import LoginComponent from "./routes/Login";

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Routes>
          {/* Adding routs component here indicates to the package (react-router-dom) that we are starting to defin our routers inside this*/}
          <Route path="/" element={<HelloComponent/>}/>
          <Route path="/login" element={<LoginComponent/>}/> 
        </Routes>
      </BrowserRouter>
      </div>
  );
}
const HelloComponent = () => {
  return <div>This is hello from component</div>;
};
export default App;
