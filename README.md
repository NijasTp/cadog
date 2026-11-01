# Cagod Matrimony

A premium matrimony and companion discovery platform for cats and dogs.

Cagod Matrimony connects responsible pet guardians to help their feline and canine family members find compatible playmates, socialization partners, and lifelong companions. Built as a high-fidelity frontend portfolio project with responsive design, tasteful animations, custom 2D SVG vector illustrations, and persistent client-side state.

---

## Brand & Design System

### 1. Color Palette
- **Primary Navy:** `#1B365D` (headings, primary branding, dark mode borders)
- **Deep Blue:** `#005A9C` (primary action buttons, focal elements)
- **Sky Blue:** `#60C1E5` (accents, active states, vector strokes)
- **Light Cyan:** `#A0E0EF` (delicate highlights, soft badges)
- **Soft Backgrounds:** `#FFFFFF` and `#F8FAFC` (light theme), `#0B1726` and `#13253B` (dark theme)

### 2. Typography
- **Headings:** Plus Jakarta Sans (loaded via Next.js Google Fonts)
- **Body & Controls:** Inter (crisp readability across desktop and mobile screens)

### 3. Strictly Simplified 2D Illustrations
- Original flat vector SVG illustrations:
  - Custom brand logo with intertwined cat and dog silhouettes
  - Hero cat and dog duo under a botanical arc
  - 16 distinct illustrated pet avatars (8 cats, 8 dogs across classic breeds)
  - 4-step illustrated "How It Works" sequence
  - Vector empty state illustrations for search, wishlist, and proposals
  - Botanical floral vector elements

---

## Key Features & Routes

- `/` **(Landing Page):**
  - Sticky responsive navigation with working dark/light theme switch
  - Hero section with functional discovery filter bar and GSAP entrance animation
  - Editorial introductory manifesto with pet welfare pillars
  - Featured pet profiles with species filter tabs (All, Cats, Dogs)
  - 4-step illustrated process flow
  - Why Choose Cagod platform advantages
  - Real pet pairing success stories
  - Verified platform metrics
  - Newsletter subscription with instant feedback and LocalStorage persistence
  - Comprehensive footer with social SVG links

- `/explore` **(Companion Directory):**
  - Real-time keyword search across pet names, breeds, locations, and bios
  - Dynamic filters: species, gender, breed dropdown, age stage, and city/state
  - Sorting: Newest first, age ascending/descending, alphabetical
  - Grid view and List view toggle
  - Active filter chips with one-click removal and reset all
  - Pagination and load more controls
  - Custom empty state illustration when filters return zero matches

- `/pets/[id]` **(Individual Pet Profile):**
  - Large 2D pet portrait with verification badges
  - Key vitals (gender, age, size, weight, coat color)
  - Guardian bio, personality traits, and veterinary disclosures
  - Express Interest modal: allows choosing which of your pets is proposing and writing a personalized note
  - Add to Favorites toggle with active feedback
  - Similar companions recommendation carousel
  - Automatic recording to recently viewed list

- `/create-profile` **(Multi-Step Registration Wizard):**
  - Step 1: Basic Information (name, species, gender, age, breed)
  - Step 2: Appearance & Avatar (coat, weight, interactive 2D illustrated avatar picker)
  - Step 3: Personality traits multi-selector
  - Step 4: Health declarations (vaccinations, sterilization, location, bio)
  - Step 5: Live profile preview with direct edit actions
  - Instant publishing to LocalStorage with direct profile navigation

- `/login` & `/register` **(Guardian Authentication):**
  - Simulated owner authentication with persistent session
  - "Autofill Demo Guardian" button for instant recruiter evaluation
  - Full registration collecting guardian name, phone, email, and location

- `/dashboard` **(Guardian Management Suite):**
  - Responsive desktop sidebar and mobile navigation tabs
  - Summary metrics: registered pets, saved favorites, sent interests, received interests
  - Overview tab with recently viewed pet profiles
  - `/dashboard/my-pets`: manage listings with edit modal, delete confirmation, and create shortcuts
  - `/dashboard/favorites`: bookmark management with species filtering and one-click removal
  - `/dashboard/interests`: sent and received proposals with accept and decline actions
  - `/dashboard/settings`: profile updates and a "Reset to Demo Dataset" utility

---

## LocalStorage Persistence Architecture

The application persists user interactions entirely on the client:
- `cagod_pets_v1`: 24 default pets merged with custom user-created profiles
- `cagod_favorites_v1`: array of saved pet IDs
- `cagod_interests_v1`: sent and received proposal records
- `cagod_recently_viewed_v1`: last 10 viewed profiles
- `cagod_current_user_v1`: authenticated owner session
- `cagod_theme_v1`: light or dark theme selection
- `cagod_newsletter_v1`: verified email subscriptions

Custom window events (`cagod_storage_change`) synchronize UI updates across components without requiring full page reloads.

---

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify a production build:

```bash
npm run build
npm run start
```
