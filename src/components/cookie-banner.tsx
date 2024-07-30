"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/storage-helper";

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);
        console.log("Cookie Consent retrieved from storage: ", storedCookieConsent);
        setCookieConsent(storedCookieConsent);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (cookieConsent !== null) {
            setLocalStorage("cookie_consent", cookieConsent);
        }

        const newValue = cookieConsent ? "granted" : "denied";

        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                analytics_storage: newValue,
            });
        }
    }, [cookieConsent]);



    if (isLoading || cookieConsent !== null) {
        return null;
    }


    return (
        <div
            style={{
                marginTop: '2.5rem',
                display: cookieConsent == null ? 'block' : 'none',
                position: 'fixed',
                bottom: 40,
                left: 0,
                right: 0,
                margin: '0 auto',
                maxWidth: 'fit-content',
                zIndex: 30,
            }}
        >
            <div style={{ position: 'relative' }}>
                <div
                    style={{
                        border: '3px solid #eaeaea',
                        margin: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ marginRight: '0.75rem' }}>
                            This site uses cookies:
                            </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            style={{
                                backgroundColor: 'red',
                                color: 'white',
                                padding: '0.5rem 1rem',

                            }}
                            onClick={() => setCookieConsent(false)}
                        >
                            Decline
                        </button>
                        <button
                            style={{
                                backgroundColor: 'green',
                                color: 'white',
                                padding: '0.5rem 1rem',

                            }}
                            onClick={() => setCookieConsent(true)}
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
