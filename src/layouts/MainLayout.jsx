import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

import Footer from "../components/Footer/Footer";

import FloatingButtons from "../components/FloatingButtons/FloatingButtons";

function MainLayout(){

return(

<>

<Navbar/>

<main>

<Outlet/>

</main>

<FloatingButtons/>

<Footer/>

</>

);

}

export default MainLayout;
