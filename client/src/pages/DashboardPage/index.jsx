import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export default function DashboardPage() {
    return (
        <div className="dashboard">
            <div className="logout-btn" onClick={console.log("logout")}>
                Logout
            </div>

            <div className="new-game-btn">
                New game
            </div>
        </div>
        
        
    )
}