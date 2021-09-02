import React, { useEffect, useState, } from 'react';
import './Home.sass'
import * as AOS from "aos"
import "aos/dist/aos.css";
// import bgIMG from "../../assets/images/loginIMG.jpg"
import CalendarySection from '../../components/CalendarySection/CalendarySection';
import { TurnResponseProvider } from '../../context/turnResponseContext';
import MyTurns from '../../components/MyTurns/MyTurns';
import { SelectedDataProvider } from '../../context/SelectedDataContext';
const Home = () => {
  const [myTurnsDiv, setMyTurnsDiv] = useState(false);
  useEffect(() => {
    //delete loader after DOM loaded
    document.getElementById("loader")?.remove()
    AOS.init({
      duration: 600, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-out', // default easing for AOS animations
      once: true,
      offset: 25,
      anchorPlacement: 'bottom-bottom'
    })
  }, [])

  return (
    <main className="Home flex" >
      <SelectedDataProvider>
        <TurnResponseProvider>
          {myTurnsDiv && <MyTurns setModal={setMyTurnsDiv} />}
          <CalendarySection />
        </TurnResponseProvider>
      </SelectedDataProvider>
    </main>
  )
}
export default Home
