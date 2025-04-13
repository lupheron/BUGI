import React from 'react';
import css from "../../../assets/css/index.module.css";
import icon from "../../../assets/media/images/icon.jpg";
import { LogoutOutlined, MailOutlined } from '@ant-design/icons';
import profile from "../../../assets/media/images/cicada.jpg";
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/famsignin");
    };

    return (
        <div className={css.header_container}>
            <div className={css.icon_container}>
                <img src={icon} alt="" />
                <h1>BUGI</h1>
            </div>

            <div className={css.profile_container}>
                <div className={css.header_voice}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
                    </svg>
                </div>

                <div className={css.header_mail}>
                    <MailOutlined style={{ fontSize: "26px" }} />
                </div>

                <div className={css.header_profile}>
                    <img src={profile} alt="profile" onClick={() => navigate("/mainpage/profile")} />
                </div>

                <div className={css.header_logout} onClick={handleLogout}>
                    <LogoutOutlined />
                </div>
            </div>
        </div>
    );
}

export default Header;
