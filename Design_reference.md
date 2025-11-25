# Modern Design Best Practices

## Philosophy

Create unique, memorable experiences while maintaining consistency through modern design principles. Every project should feel distinct yet professional, innovative yet intuitive.

---

## Landing Pages & Marketing Sites

### Hero Sections
**Go beyond static backgrounds:**
- Animated gradients with subtle movement
- Particle systems or geometric shapes floating
- Interactive canvas backgrounds (Three.js, WebGL)
- Video backgrounds with proper fallbacks
- Parallax scrolling effects
- Gradient mesh animations
- Morphing blob animations


### Layout Patterns
**Use modern grid systems:**
- Bento grids (asymmetric card layouts)
- Masonry layouts for varied content
- Feature sections with diagonal cuts or curves
- Overlapping elements with proper z-index
- Split-screen designs with scroll-triggered reveals

**Avoid:** Traditional 3-column equal grids

### Scroll Animations
**Engage users as they scroll:**
- Fade-in and slide-up animations for sections
- Scroll-triggered parallax effects
- Progress indicators for long pages
- Sticky elements that transform on scroll
- Horizontal scroll sections for portfolios
- Text reveal animations (word by word, letter by letter)
- Number counters animating into view

**Avoid:** Static pages with no scroll interaction

### Call-to-Action Areas
**Make CTAs impossible to miss:**
- Gradient buttons with hover effects
- Floating action buttons with micro-interactions
- Animated borders or glowing effects
- Scale/lift on hover
- Interactive elements that respond to mouse position
- Pulsing indicators for primary actions

---

## Dashboard Applications

### Layout Structure
**Always use collapsible side navigation:**
- Sidebar that can collapse to icons only
- Smooth transition animations between states
- Persistent navigation state (remember user preference)
- Mobile: drawer that slides in/out
- Desktop: sidebar with expand/collapse toggle
- Icons visible even when collapsed

**Structure:**
```
/dashboard (layout wrapper with sidebar)
  /dashboard/overview
  /dashboard/analytics
  /dashboard/settings
  /dashboard/users
  /dashboard/projects
```

All dashboard pages should be nested inside the dashboard layout, not separate routes.

### Data Tables
**Modern table design:**
- Sticky headers on scroll
- Row hover states with subtle elevation
- Sortable columns with clear indicators
- Pagination with items-per-page control
- Search/filter with instant feedback
- Selection checkboxes with bulk actions
- Responsive: cards on mobile, table on desktop
- Loading skeletons, not spinners
- Empty states with illustrations or helpful text

**Use modern table libraries:**
- TanStack Table (React Table v8)
- AG Grid for complex data
- Data Grid from MUI (if using MUI)

### Charts & Visualizations
**Use the latest charting libraries:**
- Recharts (for React, simple charts)
- Chart.js v4 (versatile, well-maintained)
- Apache ECharts (advanced, interactive)
- D3.js (custom, complex visualizations)
- Tremor (for dashboards, built on Recharts)

**Chart best practices:**
- Animated transitions when data changes
- Interactive tooltips with detailed info
- Responsive sizing
- Color scheme matching design system
- Legend placement that doesn't obstruct data
- Loading states while fetching data

### Dashboard Cards
**Metric cards should stand out:**
- Gradient backgrounds or colored accents
- Trend indicators (↑ ↓ with color coding)
- Sparkline charts for historical data
- Hover effects revealing more detail
- Icon representing the metric
- Comparison to previous period

---

## Color & Visual Design

### Color Palettes
**Create depth with gradients:**
- Primary gradient (not just solid primary color)
- Subtle background gradients
- Gradient text for headings
- Gradient borders on cards
- Elevated surfaces for depth

**Color usage:**
- 60-30-10 rule (dominant, secondary, accent)
- Consistent semantic colors (success, warning, error)
- Accessible contrast ratios (WCAG AA minimum)

### Typography
**Create hierarchy through contrast:**
- Large, bold headings (48-72px for heroes)
- Clear size differences between levels
- Variable font weights (300, 400, 600, 700)
- Letter spacing for small caps
- Line height 1.5-1.7 for body text
- Inter, Poppins, or DM Sans for modern feel

### Shadows & Depth
**Layer UI elements:**
- Multi-layer shadows for realistic depth
- Colored shadows matching element color
- Elevated states on hover
- Neumorphism for special elements (sparingly)

---

## Interactions & Micro-animations

### Button Interactions
**Every button should react:**
- Scale slightly on hover (1.02-1.05)
- Lift with shadow on hover
- Ripple effect on click
- Loading state with spinner or progress
- Disabled state clearly visible
- Success state with checkmark animation

### Card Interactions
**Make cards feel alive:**
- Lift on hover with increased shadow
- Subtle border glow on hover
- Tilt effect following mouse (3D transform)
- Smooth transitions (200-300ms)
- Click feedback for interactive cards

### Form Interactions
**Guide users through forms:**
- Input focus states with border color change
- Floating labels that animate up
- Real-time validation with inline messages
- Success checkmarks for valid inputs
- Error states with shake animation
- Password strength indicators
- Character count for text areas

### Page Transitions
**Smooth between views:**
- Fade + slide for page changes
- Skeleton loaders during data fetch
- Optimistic UI updates
- Stagger animations for lists
- Route transition animations

---

## Mobile Responsiveness

### Mobile-First Approach
**Design for mobile, enhance for desktop:**
- Touch targets minimum 44x44px
- Generous padding and spacing
- Sticky bottom navigation on mobile
- Collapsible sections for long content
- Swipeable cards and galleries
- Pull-to-refresh where appropriate

### Responsive Patterns
**Adapt layouts intelligently:**
- Hamburger menu → full nav bar
- Card grid → stack on mobile
- Sidebar → drawer
- Multi-column → single column
- Data tables → card list
- Hide/show elements based on viewport

---

## Loading & Empty States

### Loading States
**Never leave users wondering:**
- Skeleton screens matching content layout
- Progress bars for known durations
- Animated placeholders
- Spinners only for short waits (<3s)
- Stagger loading for multiple elements
- Shimmer effects on skeletons

### Empty States
**Make empty states helpful:**
- Illustrations or icons
- Helpful copy explaining why it's empty
- Clear CTA to add first item
- Examples or suggestions
- No "no data" text alone

---

## Unique Elements to Stand Out

### Distinctive Features
**Add personality:**
- Custom cursor effects on landing pages
- Animated page numbers or section indicators
- Unusual hover effects (magnification, distortion)
- Custom scrollbars
- Glassmorphism for overlays
- Animated SVG icons
- Typewriter effects for hero text
- Confetti or celebration animations for actions

### Interactive Elements
**Engage users:**
- Drag-and-drop interfaces
- Sliders and range controls
- Toggle switches with animations
- Progress steps with animations
- Expandable/collapsible sections
- Tabs with slide indicators
- Image comparison sliders
- Interactive demos or playgrounds

---

## Consistency Rules

### Maintain Consistency
**What should stay consistent:**
- Spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Border radius values
- Animation timing (200ms, 300ms, 500ms)
- Color system (primary, secondary, accent, neutrals)
- Typography scale
- Icon style (outline vs filled)
- Button styles across the app
- Form element styles

### What Can Vary
**Project-specific customization:**
- Color palette (different colors, same system)
- Layout creativity (grids, asymmetry)
- Illustration style
- Animation personality
- Feature-specific interactions
- Hero section design
- Card styling variations
- Background patterns or textures

---

## Technical Excellence

### Performance
- Optimize images (WebP, lazy loading)
- Code splitting for faster loads
- Debounce search inputs
- Virtualize long lists
- Minimize re-renders
- Use proper memoization

### Accessibility
- Keyboard navigation throughout
- ARIA labels where needed
- Focus indicators visible
- Screen reader friendly
- Sufficient color contrast
- Respect reduced motion preferences

---

## Key Principles

1. **Be Bold** - Don't be afraid to try unique layouts and interactions
2. **Be Consistent** - Use the same patterns for similar functions
3. **Be Responsive** - Design works beautifully on all devices
4. **Be Fast** - Animations are smooth, loading is quick
5. **Be Accessible** - Everyone can use what you build
6. **Be Modern** - Use current design trends and technologies
7. **Be Unique** - Each project should have its own personality
8. **Be Intuitive** - Users shouldn't need instructions


---

# Project-Specific Customizations

**IMPORTANT: This section contains the specific design requirements for THIS project. The guidelines above are universal best practices - these customizations below take precedence for project-specific decisions.**

## User Design Requirements

# Rituals — Development Blueprint

Rituals is a cross-platform (mobile + web) personal sleep coach that generates daily personalized pre-sleep and morning rituals to reduce sleep latency and improve sleep quality. It combines an adaptive ritual-builder, audio-first guided sessions, daytime coaching, wearables integrations, journaling, and habit tracking, delivered via an accessible, low-stimulation experience with freemium + subscription monetization.

## 1. Pages (UI Screens)

- Dashboard (User home)
  - Purpose: Daily home to show today's ritual, start actions, and quick progress snapshots.
  - Key sections/components:
    - Today's Ritual Card (condensed timeline; Start Wind-down, Play In-Bed Audio)
    - Sleep Score Tile (last night score + delta)
    - Habits & Streaks list (toggles, completion badges)
    - Weekly Trends Chart (latency, TST, quality)
    - Quick Actions (Log sleep, Adjust schedule, Connect wearable, Full report)
    - Notification summary / Next reminder CTA

- Onboarding / Assessment
  - Purpose: Capture sleep history, constraints, preferences and safety flags to seed personalization.
  - Key sections/components:
    - Progress Wizard (multi-step, back/forward)
    - Questions Panels (schedule, caffeine, naps, meds, severity)
    - Preferences (audio voice, light sensitivity, integrations opt-in)
    - Safety Flags panel (clinical red-flag routing)
    - Finish CTA and preview of today's ritual

- Login / Signup
  - Purpose: Authentication entry (email/password, social OAuth, guest mode).
  - Key sections/components:
    - Email Sign-up Form (name optional, referral code)
    - Login Form (forgot password)
    - Social OAuth buttons (Google, Apple, Facebook optional)
    - Legal Notice and consent checkbox (GDPR)
    - Try as Guest CTA

- User Profile
  - Purpose: Manage personal info, devices, and account-level actions.
  - Key sections/components:
    - Profile Summary (name, email, timezone, sleep window)
    - Connected Accounts (wearables list; connect/disconnect)
    - Account Actions (export data, delete account, change password)
    - Subscription Summary (plan status, billing link)

- 404 Not Found
  - Purpose: Friendly route-missing UX and navigation recovery.
  - Key sections/components:
    - Illustration + message, CTA to Dashboard/Landing
    - Search input for rituals/help
    - Report issue button

- Password Reset
  - Purpose: Secure password recovery flow.
  - Key sections/components:
    - Request Reset Form (email, optional reCAPTCHA)
    - Reset Token Page (new password + confirm; strength meter)
    - Success Confirmation + link to login

- Ritual Builder (Daily Plan)
  - Purpose: Core editable ritual timeline generator with scheduling and export.
  - Key sections/components:
    - Auto-Generated Ritual Timeline (editable step cards with time anchors)
    - Edit Controls (drag/reorder, duration slider, replace, skip)
    - Save & Schedule button (set reminders)
    - Ritual Variants (short, travel, shift-work)
    - Share/Export (PDF, ICS calendar add, clinician export)

- Email Verification
  - Purpose: Confirm user email post-signup.
  - Key sections/components:
    - Verification Status message
    - Resend button with cooldown
    - Continue CTA if verified

- Landing Page
  - Purpose: Public marketing and conversion funnel.
  - Key sections/components:
    - Hero Section (headline, subheadline, CTAs)
    - Feature Tiles (Ritual Builder, Morning Optimization, Audio)
    - How It Works (3-step schematic)
    - Pricing Teaser
    - Testimonials & logos
    - Footer (legal links, contact)

- Settings & Preferences
  - Purpose: Configure notifications, audio, privacy, subscription, accessibility.
  - Key sections/components:
    - Notification Scheduler (preferred windows, quiet hours)
    - Audio Preferences (voice selection, background volume, downloads)
    - Privacy & Data (export/delete, local-only toggle)
    - Subscription Management (billing, cancel/upgrade)
    - Accessibility Controls (font size, high contrast, reduced motion)

- Guided Session Player
  - Purpose: Audio-first playback for in-bed and wind-down sessions with minimal stimulation.
  - Key sections/components:
    - Audio Player Controls (play/pause, skip segments, volume, sleep timer, speed limits)
    - Session Outline (segment cards + durations)
    - Minimal Visual Mode toggle (dark, large tap targets, screen-off support)
    - Download toggle for offline

- Sleep Journal
  - Purpose: Structured pre-sleep and morning journaling with voice-to-text option.
  - Key sections/components:
    - Pre-Sleep Prompt Modal (worries, wins, gratitude; voice-to-text)
    - Morning Entry (quality rating, energy, dream notes)
    - Entry History List (search, tags, export)
    - Mood Tags & Auto-Summary

- About / Help Center
  - Purpose: FAQs, clinical guidance, support contact.
  - Key sections/components:
    - FAQ sections (categorized)
    - Help Search with suggested articles
    - Contact Support form (attach logs)
    - Clinical Resources + legal disclaimers

- Sleep Tracking & Integrations
  - Purpose: Connect wearables and view synced sleep data.
  - Key sections/components:
    - Integrations List (Apple Health, Google Fit, Oura, Fitbit, Garmin)
    - Sleep Sessions List (imported + manual)
    - Sync Status & troubleshooting
    - Data Privacy Controls

- Pricing & Checkout
  - Purpose: Present tiers and handle subscription purchase flows.
  - Key sections/components:
    - Pricing Tiers (feature comparison)
    - Checkout Modal/Form (Stripe; promo code)
    - Trial flow and reminders
    - Billing history redirect (portal)

- Admin Dashboard
  - Purpose: Platform operations: users, content, analytics, support.
  - Key sections/components:
    - User List & Segments (search, filter, impersonate read-only)
    - Content Manager (audio upload, ritual templates)
    - Analytics Panels (MAU, retention, conversion)
    - Support Tickets view/respond
    - RBAC & Audit logs

- Terms of Service
  - Purpose: Legal terms governing app use.
  - Key sections/components:
    - Terms text with effective date/version

- Loading / Success States
  - Purpose: Reusable skeletons, spinners, and toasts.
  - Key sections/components:
    - Loading skeletons
    - Success toasts/pages
    - Error toasts with retry

- Privacy Policy
  - Purpose: Detailed data use, retention, third parties, user rights.
  - Key sections/components:
    - Policy sections, consent management link, DPO contact

- 500 Server Error
  - Purpose: Server-failure UX with retry and support link.
  - Key sections/components:
    - Error message, retry button, contact support with diagnostic ID

## 2. Features

- Subscription & Payment Processing
  - Technical details:
    - Integrate Stripe Subscriptions, Checkout, Promo Codes, Customer Portal.
    - Webhooks for invoice.payment_succeeded, invoice.payment_failed, customer.subscription.updated.
    - No raw card storage; store Stripe customer_id, subscription_id in DB.
  - Implementation notes:
    - Server-side webhook handlers with signature verification, idempotency, and reconciliation job.
    - Proration support and trial handling; show trial status in UI.
    - Billing portals redirect for self-service cancellation.

- Ritual Builder & Scheduler
  - Technical details:
    - Ritual generation engine: inputs = user_profile + local context → output JSON ritual timeline (steps, durations, recommended times).
    - Persist in user_rituals table with version history.
    - Reminder scheduling via server-side push scheduling + local notification fallback.
    - Export: PDF generation service (server-side) and ICS calendar generator.
  - Implementation notes:
    - Engine rules as JSON config with weights; support runtime overrides.
    - Offline cache of today's ritual and associated audio metadata; audio assets downloadable.
    - Implement optimistic UI when editing and save-as-draft.

- Admin & Content Management
  - Technical details:
    - RBAC with admin, editor, support roles; audit logs in DB.
    - S3-backed audio storage + transcoding pipeline (mp3/aac/ogg) and metadata store.
    - CMS editor for guided sessions (script text, segments, timestamps, audio upload).
  - Implementation notes:
    - Signed S3 upload URLs and status callbacks post-transcode.
    - Admin actions gated by MFA and IP allowlist.

- Onboarding Assessment & Personalization
  - Technical details:
    - Multi-step wizard with partial save, client+server validation.
    - Decision rules engine (JSON-based) mapping answers → initial ritual weights & templates.
    - user_preferences table with versioning.
  - Implementation notes:
    - Flag safety/clinical red-flags to show clinician resources and optionally notify admins (opt-in).
    - Analytics event emitted per completed step for funnel analysis.

- Sleep Journal & Mood Tracking
  - Technical details:
    - CRUD endpoints; full-text search via Elasticsearch or DB full-text.
    - Speech-to-text optional integration with cloud STT (or on-device).
    - Conflict resolution strategy: local-first writes with last-write-wins and sync conflict UI.
  - Implementation notes:
    - Journal privacy opt-in for cloud transcription.
    - Export route to PDF/CSV with clinician consent.

- Notifications & Reminders
  - Technical details:
    - Push: FCM (Android) + APNs (iOS); server schedules notifications using user timezone and preferences.
    - Email notifications via SendGrid for summaries and transactional messages.
    - Respect Do-Not-Disturb windows; exponential backoff for failures.
  - Implementation notes:
    - Local notifications scheduled on device for time-sensitive reminders (fallback if push delayed).
    - In-app reminders with badge and snooze options.

- Analytics & Progress Reporting
  - Technical details:
    - Events instrumented to Segment/GA4; batch to Snowplow/warehouse for KPIs.
    - Pre-built aggregations for retention, ritual completion, conversion, sleep metric deltas.
    - User-facing computed metrics (sleep latency change, streaks); server compute or scheduled jobs.
  - Implementation notes:
    - Standardized event schema; privacy-respecting sampling for sensitive data.
    - A/B test tagging for variants via experiment IDs.

- Guided Audio Player & Offline Audio
  - Technical details:
    - Audio assets on S3 + CloudFront with signed URL access for protected downloads.
    - Mobile background audio handling: AVAudioSession + MediaSession APIs.
    - Offline cache: encrypted local storage, max storage quotas, purge policies.
  - Implementation notes:
    - Sleep timer auto-stop and resume state; safe playback speed limits (e.g., 0.9–1.1x).
    - Provide transcripts, downloadable for clinicians with consent.

- User Authentication
  - Technical details:
    - JWT access + refresh tokens; web uses httpOnly secure cookies; mobile uses secure storage.
    - Passwords hashed with argon2/bcrypt; enforce strength and reuse policies.
    - OAuth: Google, Apple (mandatory iOS), optional Facebook; handle email collisions.
  - Implementation notes:
    - Email verification tokens with expiry and resend cooldown.
    - Rate-limiting, brute-force protection, and optional reCAPTCHA.

- Sleep Tracking & Wearable Integrations
  - Technical details:
    - Integrations: HealthKit (Apple), Google Fit, Oura API, Fitbit, Garmin.
    - Map external sleep schema to internal sleep model (TIB, latency, awakenings, stages).
    - Use webhook or polling as per provider; manage token refresh securely.
  - Implementation notes:
    - Normalization layer to handle vendor differences; confidence score per imported session.
    - Allow manual overrides and merged sessions.

## 3. User Journeys

- New User (Primary — consumer)
  1. Land on Landing Page → Click Get Started.
  2. Signup (email/password or social) → Email verification sent.
  3. Complete Onboarding Assessment (multi-step) → Safety flags reviewed.
  4. Server builds initial ritual → Dashboard shows Today's Ritual preview.
  5. Accept ritual or edit in Ritual Builder → Save & schedule reminders.
  6. Receive afternoon cue notifications → Follow suggested actions.
  7. Start Wind-down or Play In-Bed Audio via Guided Session Player (minimal visual mode).
  8. Complete a pre-sleep journal entry (optional) → App logs ritual completion & updates streak.
  9. Morning reminder prompts light exposure & movement → User logs sleep or wearable syncs session.
 10. Dashboard updates with sleep score & trend; personalization engine adapts next day's ritual.

- Returning User (Habit builder)
  1. Open app → Dashboard displays ritual & progress tile.
  2. See habit streaks and trend change → Tap Quick Actions to log manual sleep or connect wearable.
  3. Edit ritual for travel/shift-work variant if needed → Save.
  4. Download guided audio for offline use (if premium) → Play at wind-down.

- User With Wearable
  1. From Settings → Connect Oura/Apple Health/Google Fit with OAuth.
  2. Permissions granted → Sync initial history.
  3. Incoming sleep sessions appear in Sleep Tracking page; confidence scores shown.
  4. Personalization engine uses imported metrics to adjust ritual timing/difficulty.

- Guest / Try-As-Guest
  1. Choose Try as Guest on Login → Temporary local profile created.
  2. Use limited rituals and one guided session → Option to upgrade to save history and enable integrations.

- Premium Subscriber
  1. From Pricing page → Choose annual/monthly → Checkout via Stripe.
  2. Access unlimited audio, offline downloads, device integrations, advanced analytics.
  3. Billing handled via Stripe; webhooks update subscription state in DB.
  4. Access clinician export reports and advanced personalization.

- Clinician / Read-Only User
  1. Admin grants clinician read-only access (via invitation).
  2. Clinician views exportable rituals and user-consented reports (PDF).
  3. No direct editing of user account unless consented.

- Admin (Platform operator)
  1. Login to Admin Dashboard (MFA enforced).
  2. Manage users, content, audio library, view analytics, handle support tickets.
  3. Publish new guided sessions and monitor A/B test metrics.

## 4. UI Guide

- Color palette
  - Primary: Calm Indigo — #2C3E8A (brand interactive elements)
  - Accent: Soft Lavender — #A79BE2 (highlights, calls-to-action secondary)
  - Neutral Dark: Charcoal — #111318 (text on light; primary dark UI element)
  - Neutral Light: Paper — #F6F7FB (background)
  - Success: Mint — #2ECC9B
  - Warning: Amber — #F5A623
  - Error: Coral — #FF6B6B
  - Modal/Darken overlay: Black 60% (for audio minimal mode)

- Typography
  - System stack preference for performance; fallback fonts:
    - Headings: Inter SemiBold (or system sans-serif)
    - Body: Inter Regular
    - UI Microcopy: Inter Medium 12/13px
  - Type scale (mobile baseline):
    - H1: 28px / 36px line-height
    - H2: 22px / 28px
    - Body: 16px / 22px
    - Small: 13px / 18px
  - Accessibility:
    - Minimum contrast ratio 4.5:1 for body text; 3:1 for larger headings.
    - Support user font-size scaling and high-contrast mode.

- Component specs
  - Buttons:
    - Primary: filled with Primary color, 16px height on mobile tap target 44px, radius 12px.
    - Secondary: outline with Primary border, transparent background.
    - Minimal action: text-only link (accent color).
  - Inputs:
    - Height 44px, rounded 10px, placeholder contrast 60%.
    - Inline validation with icons and error text in Coral.
  - Cards:
    - Elevation: subtle shadow (e.g., rgba(16,24,40,0.04)), padding 16px, radius 12px.
    - Timeline Step Card: left time anchor, step icon, title, subtitle, duration control on hover/edit.
  - Charts:
    - Line and bar use Primary and Accent palette; gridlines subtle (#E9EDF5).
  - Audio Player:
    - Minimal dark theme by default for in-bed mode; large play/pause central button; secondary controls smaller.
    - Sleep timer and minimal text; disable deep navigation while active.
  - Toasts & Modals:
    - Toast: bottom non-blocking, auto-dismiss 3–5s; dark background for minimal stimulation.
    - Modal: center on web, bottom sheet on mobile for ritual editing.

- Layout principles
  - Responsive breakpoint system: mobile-first.
    - Mobile: single-column vertical flow with bottom nav (Dashboard, Rituals, Player, Journal, Profile).
    - Tablet: two-column for Dashboard (timeline + trends).
    - Desktop: wider grid with side navigation; full ritual builder workspace.
  - Spacing: 8px baseline grid; primary paddings: 16px (mobile), 24px (tablet/desktop).
  - Hierarchy: clear visual weight for ritual action buttons and minimal chrome in in-bed modes.

- Visual style & mood
  - Calm, non-clinical, warm minimalism; photography uses subdued natural light; illustrations are soft, rounded shapes.
  - Avoid high-contrast flashy elements in sleep flows; prefer subdued hues and motion-reduced transitions.
  - Micro-animations: gentle easing, short duration (150–250ms); respect reduced-motion user setting.

- Component patterns
  - Timeline editor:
    - Reorder via drag handle; live preview of total ritual duration; undo/redo support.
    - Inline replace/select suggestion modal with card picker.
  - Minimal Visual Mode:
    - Toggle from Guided Session Player; switches to dark palette, larger tap targets, and disables non-essential navigation.
  - Offline-first assets:
    - Show download status per audio item; storage indicator in Settings.
  - Notifications scheduler UI:
    - Time-window sliders with suggested slots; quick presets (Evening wind-down: 60–90m before sleep).
  - Error handling:
    - Inline errors for forms; full-page error for critical failures with diagnostic code and support CTA.

- Accessibility
  - All interactive controls meet 44x44px touch target where applicable.
  - Semantic HTML and ARIA roles for screen readers.
  - Keyboard navigable on web and accessible focus states.
  - Color blindness-safe palette tuning and configurable high-contrast mode.
  - Provide transcripts and captions for audio content; optional visual timers.

- Imagery & Iconography
  - Photography: calming lifestyle shots, low saturation; use for landing/marketing.
  - Illustrations: custom rounded, line-art style for empty states and onboarding.
  - Icon system: single-weight rounded icons consistent across platforms.

Instructions to AI Development Tool
After every development step, refer back to this blueprint to ensure correct implementation. Verify all features and pages are built according to specifications before completing the project. Pay special attention to the UI Guide section and ensure all visual elements follow the design system exactly.

## Implementation Notes

When implementing this project:

1. **Follow Universal Guidelines**: Use the design best practices documented above as your foundation
2. **Apply Project Customizations**: Implement the specific design requirements stated in the "User Design Requirements" section
3. **Priority Order**: Project-specific requirements override universal guidelines when there's a conflict
4. **Color System**: Extract and implement color values as CSS custom properties in RGB format
5. **Typography**: Define font families, sizes, and weights based on specifications
6. **Spacing**: Establish consistent spacing scale following the design system
7. **Components**: Style all Shadcn components to match the design aesthetic
8. **Animations**: Use Motion library for transitions matching the design personality
9. **Responsive Design**: Ensure mobile-first responsive implementation

## Implementation Checklist

- [ ] Review universal design guidelines above
- [ ] Extract project-specific color palette and define CSS variables
- [ ] Configure Tailwind theme with custom colors
- [ ] Set up typography system (fonts, sizes, weights)
- [ ] Define spacing and sizing scales
- [ ] Create component variants matching design
- [ ] Implement responsive breakpoints
- [ ] Add animations and transitions
- [ ] Ensure accessibility standards
- [ ] Validate against user design requirements

---

**Remember: Always reference this file for design decisions. Do not use generic or placeholder designs.**
