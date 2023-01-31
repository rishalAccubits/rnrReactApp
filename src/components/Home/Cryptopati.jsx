import React from 'react'
import Landing from '../Landing/Landing'
import Register from '../Register/Register';
import Navbar from '../Navbar/Navbar'
import { Route, Routes} from "react-router-dom";
import Claim from '../Claim/Claim';
import Play from '../Play/Play';
import LeaderBoard from '../LeaderBoard/LeaderBoard';


const Cryptopati = ({registrationStatus,connected,account,balance}) => {

  return (
    <div>
     <Navbar registrationStatus={registrationStatus} connected={connected} />
     <div>
        { (connected && registrationStatus )&&
        <Routes>
        <Route
          path="/"
          element={
              <Landing 
                account={account}
                balance={balance}
              />
          }
        />
        <Route
          path="/claim"
          element={
              <Claim 
                account={account}
                balance={balance}
             />
          }
        />
        <Route
          path="/play"
          element={
              <Play 
                account={account}
                balance={balance}/>
          }
        />
        <Route
          path="/leaderboard"
          element={
              <LeaderBoard />
          }
        />
        
      </Routes>}
      {!registrationStatus &&
        <Routes>
        <Route
            path="/register"
            element={
                <Register 
                  account={account}
                  balance={balance}
                />
            }
          />
          <Route
            path="/tutorial"
            element={
                <Claim 
                  account={account}
                  balance={balance}
              />
            }
          />    
      </Routes>
      }
     </div>
     
    </div>
  )
}

export default Cryptopati