
import './App.css'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Body from "./components/Body.jsx";

const  App=()=> {

  return(
      <div className={"content-container"}>
        <Header/>
        <Body/>
        <Footer/>
      </div>
  )
}

export default App
