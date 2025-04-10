import React, { useEffect, useRef } from 'react';
import css from "../../assets/css/index.module.css"
import icon from "../../assets/media/images/icon.jpg"
import { Button } from 'antd';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';

function Site() {
    const navigate = useNavigate();
    const el = useRef(null);

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
                        onClick={() => navigate("/register")}
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
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign In
                    </Button>
                </div>
            </header>

            <main className={css.site_main}>
                <h1 ref={el}></h1>
            </main>
        </div>
    );
}

export default Site;