import React, { useEffect, useRef, useState } from 'react';
import css from "../../assets/css/index.module.css"
import icon from "../../assets/media/images/icon.jpg"
import { Button, Divider, Modal } from 'antd';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import AloneRegister from '../Auth/Register/AloneRegister';
import Register from '../Auth/Register/Register';
import AloneSign from '../Auth/SignIn/AloneSign';
import SignIn from '../Auth/SignIn/SignIn';

function Site() {
    const navigate = useNavigate();
    const el = useRef(null);

    let [regtype, setRegtype] = useState("family");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authType, setAuthType] = useState(null); // 'register' or 'sign-in'

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "Hello, I'm BUGI. My role is to assist you and help make your life easier than ever before. I truly hope to be a valuable support for you and your career (^_^)",
            ],
            startDelay: 100,
            typeSpeed: 45,
            backSpeed: 50,
            backDelay: 100,
            showCursor: false
        });

        return () => {
            typed.destroy();
        };
    }, []);

    const showAuthModal = (type) => {
        setAuthType(type); // set whether it's 'register' or 'sign-in'
        setIsModalOpen(true);
    };

    const handleAuthChoice = (choice) => {
        setIsModalOpen(false);
        if (authType === "register") {
            navigate(choice === "family" ? "/fam-register" : "/alone-reg");
        } else {
            navigate(choice === "family" ? "/fam-sign" : "/alone-sign");
        }
    };

    return (
        <div className={css.site_container}>
            <header className={css.site_header}>
                <div className={css.icon_container}>
                    <img src={icon} alt="" />
                    <h1>BUGI</h1>
                </div>

                <div className={css.authentication_container}>
                    <Button
                        className={css.auth_btns}
                        type="link"
                        style={{
                            backgroundColor: "oklch(37.9% 0.146 265.522)",
                            color: "white"
                        }}
                        onClick={() => showAuthModal("register")}
                    >
                        Register
                    </Button>
                    <Button
                        className={css.auth_btns}
                        type="link"
                        style={{
                            backgroundColor: "oklch(39.3% 0.095 152.535)",
                            color: "white"
                        }}
                        onClick={() => showAuthModal("sign-in")}
                    >
                        Sign In
                    </Button>
                </div>
            </header>

            <main className={css.site_main}>
                <h1 ref={el}></h1>
            </main>

            <Modal
                title="Select Authentication Type"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                    <Button
                        type={regtype === "family" ? "primary" : "default"}
                        onClick={() => setRegtype("family")}
                    >
                        Family
                    </Button>
                    <Button
                        type={regtype === "single" ? "primary" : "default"}
                        onClick={() => setRegtype("single")}
                    >
                        Single
                    </Button>
                </div>

                <Divider />
                {authType === "register" ? (
                    regtype === "single" ? <AloneRegister /> : <Register />
                ) : (
                    regtype === "single" ? <AloneSign /> : <SignIn />
                )}

            </Modal>
        </div>
    );
}

export default Site;
