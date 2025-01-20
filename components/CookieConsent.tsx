"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="cookie__wrapper">
      <p className="cookie__text text__small">
        This website uses cookies to ensure you get the best experience on our
        website.
        <Link scroll={false} href="/legal-notice">
          Learn more.
        </Link>
      </p>
      <div className="cookie__buttons">
        <span className="cookie__button">
          <p className="text__big" onClick={handleAccept}>
            Accept
          </p>
        </span>
        <span className="cookie__button">
          <p className="text__big" onClick={handleDecline}>
            Decline
          </p>
        </span>
      </div>
    </div>
  );
}
