"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/storage-helper";

// CookieBanner component that displays a banner for cookie consent.
export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Retrieve cookie consent status from local storage on component mount
    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null);
        console.log("Cookie Consent retrieved from storage: ", storedCookieConsent);
        setCookieConsent(storedCookieConsent);
        setIsLoading(false);
    }, []);

    // Update local storage and Google Analytics consent status when cookieConsent changes
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

    // Do not render the banner if loading or consent is already given
    if (isLoading || cookieConsent !== null) {
        return null;
    }

    return (
        <div className={`cookie-banner ${cookieConsent == null ? 'visible' : 'hidden'}`}>
            <div className="cookie-banner-inner">
                <div className="cookie-banner-content">
                    <div className="cookie-banner-text">
                        <p>This site uses cookies:</p>
                    </div>
                    <div className="cookie-banner-buttons">
                        <button className="decline-button" onClick={() => setCookieConsent(false)}>
                            Decline
                        </button>
                        <button className="accept-button" onClick={() => setCookieConsent(true)}>
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}