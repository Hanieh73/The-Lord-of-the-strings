import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoutImg from "./logout.png";
import awardsImg from "./award.png";
import newgameImg from "./new game.png";
import resumeImg from "./resume.png"
import dashImg from "./dash2.png"
import leaderboardImg from "./leaderboard.png"
import settingsImg from "./settings.png"

export default function DashboardPage() {
    return (
        <div className="dashboard">

            {/* <div className="row">
                <div className="col-12">
                    <div className="dashboard-img">                    
                        <img src={dashImg} alt="dashboard image" />
                        <div className="overlay-text">Welcome Name</div>
                    </div>
                </div>
            </div> */}


            <div className="row dashboard2">
                <div className="col-12">
                    <div className="dashboard-img">                    
                        <div className="overlay-text">Welcome Name</div>
                    </div>
                </div>
            </div>
            

            
            {/* <div className="row">
                <div className="col-3"></div>
                <div className="col-2 text-right">
                    <img src={logoutImg} alt="logout" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-2 text-center">
                    <img src={settingsImg} alt="settings" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-2 text-left">
                    <img src={awardsImg} alt="Awards" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-3"></div>
            </div>


            <div className="row">
                <div className="col-3"></div>
                <div className="col-2 text-right">
                    <img src={newgameImg} alt="newgame" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-2 text-center">
                    <img src={resumeImg} alt="resumegame" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-2 text-left">
                    <img src={leaderboardImg} alt="leaderboards" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-3"></div>
            </div> */}



            <div className="row dashboard2">
                <div className="col-3"></div>
                <div className="col-2 text-right">
                    <img src={logoutImg} alt="logout" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-2 text-center">
                    <img src={settingsImg} alt="settings" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-2 text-left">
                    <img src={awardsImg} alt="Awards" className='img-fluid dashboard-btns'/>
                </div>
                <div className="col-3"></div>
            </div>


            <div className="row">
                <div className="col-3"></div>
                <div className="col-2 text-right">
                    <img src={newgameImg} alt="newgame" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-2 text-center">
                    <img src={resumeImg} alt="resumegame" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-2 text-left">
                    <img src={leaderboardImg} alt="leaderboards" className='img-fluid dashboard-btns-row2'/>
                </div>
                <div className="col-3"></div>
            </div>




            
        </div>
        
        
    )
}