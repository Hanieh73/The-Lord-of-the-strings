import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import backgroundmp4 from "./background.mp4";
import { TypeAnimation } from 'react-type-animation';

export default function LeaderboardsPage() {


    useEffect(() => {
        console.log("leaderboards loaded");
        
    }, [])
    

  

    
    return (
        <div className="leaderboard">

            <video id="video-background" autoPlay loop muted>
                <source src={backgroundmp4} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>

            <div id="overlay"></div>

            <div className="row dashboard2">
                <div className="col-12">
                    <div className="overlay-text text-center">
                        <TypeAnimation
                        key={"Leaderboards"}
                        sequence={[`Leaderboard`]}
                        speed={10}
                        
                        />
                    </div>
                </div>
            </div>

            <div className="container">
            <div className="row dashboard2 justify-content-center">
                <div className="col-3"></div>

                <div className="col-6">
                    <div className="leaderboard-table text-center">
                        <table>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        <tr>
                            <td>Figo</td>
                            <td>-7</td>
                        </tr>
                        <tr>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                        </tr>
                        </table>
                    </div>
                </div>

                <div className="col-3"></div>
            </div>
            </div>

            

        </div>
       
     
  );
}
