import React, { useEffect, useState } from "react";
import './Profile.css';
import './App.css';
import axios from "axios";

const Profile = () => {
    const [token, setToken] = useState(
      JSON.parse(localStorage.getItem("token")) || []
    );
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/user/profile/',{
            headers: {
                'Authorization': `Token ${token.data.token}`,
            }
        }).then((response) => {
            setUsername(response.data.username);
            setEmail(response.data.email);
        })
    }, [])

    return (
            <div className="profileContainer">
                <button type="button" className="btn btn-outline-dark">Edit profile</button>
                <h1 className="userTag">{userName}</h1>
                <h6 className="emailTag">{email}</h6>
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