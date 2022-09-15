import React from "react";
import './Profile.css';
import './App.css';

const Profile = () => {
    return (
            <div className="profileContainer">
                <button type="button" className="btn btn-outline-dark">Edit profile</button>
                <h1 className="userTag">Username</h1>
                <h6 className="emailTag">email@email.com</h6>
                <div className="tagDataContainer">
                    <div className="tagsContainer">
                        <div className="tagContainer">
                            <p className="numTags">0</p>
                            <p className="textTags">Followers</p>
                        </div>
                        <div className="tagContainer">
                            <p className="numTags">0</p>
                            <p className="textTags">Entries</p>
                        </div>
                        <div className="tagContainer">
                            <p className="numTags">0</p>
                            <p className="textTags">Following</p>
                        </div>
                    </div>
                </div>
                <div className="entriesContainer">
                    <div>Aqui se colocaran las entries del usuario</div> 
                </div>
            </div>                    
    );
}

export default Profile;