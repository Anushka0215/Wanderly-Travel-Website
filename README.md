# Wanderly — Curated Travel Website

A complete, responsive boutique travel website built exclusively with semantic **HTML5**, modern **CSS3**, and **vanilla JavaScript** — designed in a **cream (`#FAF7F2`), pure white (`#FFFFFF`), and forest green (`#1B4332`)** palette.

## Project Structure

```text
Wanderly-Travel-Website/
├── index.html   # Semantic structure, hero, destination cards, booking & contact sections
├── style.css    # Responsive layout, cream/white/forest-green theme, print & modal styles
├── script.js    # Navigation, category filters, itinerary modal, live pricing & validation
└── README.md    # Project overview and usage guide
```

## Key Features

- **Modern Responsive Navbar**: Sticky glassmorphic header, active section highlighting on scroll, smooth anchor navigation, and an accessible mobile hamburger menu (`Escape` and outside-click dismissible).
- **Atmospheric Hero Section**: Custom layered SVG mountain-valley travel backdrop, trust metrics, and an **Explore Destinations** button with smooth scrolling.
- **Four Curated Destinations**: **Manali**, **Goa**, **Kashmir**, and **Jaipur**, each featuring custom scenic artwork, duration/region badges, highlights, category filtering (`All`, `Mountains`, `Coastal`, `Heritage`), a day-by-day **Itinerary Modal**, and one-click **Book Now** pre-selection.
- **About Section**: Brand story, metrics, and four core travel pillars.
- **Interactive Booking Form & Live Estimator**:
  - Real-time trip cost breakdown (destination base rate, experience tier multiplier, guest count, and 5% taxes/concierge fee).
  - Client-side validation for name, email, phone number (10–15 digits), destination, departure date (prevents past dates), traveler count (1–10), and terms consent.
  - Detailed **Booking Confirmation Card** with a generated reference ID (`WND-YYYY-XXXX`), print summary option, and reset flow.
- **Contact Section & Professional Footer**: Validated quick-inquiry form, one-click email copy button, interactive destination itinerary links, and a validated footer newsletter signup.

## Running Locally

No build tools or dependencies are required.

1. Open `index.html` directly in any modern browser, **or**
2. Serve the folder with any static server, for example:
   ```bash
   python -m http.server 8080
   ```
   Then visit `http://localhost:8080`.
