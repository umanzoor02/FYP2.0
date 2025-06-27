"use client"

import { ExternalLink } from "lucide-react"

export default function CommunityButton() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-10 ">
      <a
        href="https://www.instagram.com/mynurtureai?utm_source=qr&igsh=ZTNrOGdkMTAzZDR4"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-gradient btn-lg d-inline-flex align-items-center gap-2 px-4 py-3 fs-5 fw-semibold text-white text-decoration-none position-relative overflow-hidden"
        style={{
          outline: "none",
          border: "none",
          WebkitTapHighlightColor: "transparent",
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        {/* Gradient overlay for hover effect */}
        <div className="gradient-overlay position-absolute top-0 start-0 w-100 h-100" />

        {/* Content */}
        <span className="position-relative" style={{ zIndex: 10 }}>
          Connect With Us!
        </span>
        <ExternalLink className="position-relative arrow-icon" style={{ zIndex: 10, width: "20px", height: "20px" }} />

        {/* Shine effect */}
        <div className="shine-effect position-absolute top-0 start-0 w-100 h-100" />
      </a>
    </div>
  )
}
