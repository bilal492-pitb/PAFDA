# PAFDA Website Design Guidelines

## Design Approach
**Selected System**: Material Design-inspired institutional design
**Rationale**: Government organization requiring professional credibility, information hierarchy, and robust form components for calculators. Material Design provides the structured framework needed for complex data presentation while maintaining accessibility and trust.

## Typography System

**Font Families**:
- Primary: 'Inter' or 'Roboto' (headers, body, UI elements)
- Secondary: 'Source Sans Pro' (technical data, calculator results)

**Hierarchy**:
- H1 (Hero Titles): text-5xl md:text-6xl, font-bold
- H2 (Section Headers): text-3xl md:text-4xl, font-semibold
- H3 (Subsections): text-2xl md:text-3xl, font-semibold
- H4 (Card Titles): text-xl md:text-2xl, font-medium
- Body Text: text-base md:text-lg, font-normal
- Small Text (metadata): text-sm, font-normal
- Calculator Labels: text-sm font-medium, uppercase tracking-wide
- Results Text: text-lg md:text-xl, font-semibold

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4 to p-8
- Section padding: py-16 md:py-24
- Element margins: mb-4, mb-8, mb-12
- Grid gaps: gap-6 to gap-8

**Container Strategy**:
- Full-width sections: w-full with inner max-w-7xl mx-auto px-4 md:px-8
- Content sections: max-w-6xl mx-auto
- Text-heavy content: max-w-4xl mx-auto
- Calculator containers: max-w-3xl mx-auto

**Grid Patterns**:
- Service cards (Agriculture/Food/Drug): grid-cols-1 md:grid-cols-3 gap-8
- News highlights: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Calculator inputs: grid-cols-1 md:grid-cols-2 gap-4
- Footer columns: grid-cols-1 md:grid-cols-4 gap-8

## Component Library

### Navigation Bar
- Fixed position with backdrop blur
- Two-row structure: Top row (contact info, social), Main row (logo, menu items)
- Mega dropdown menus for multi-level navigation
- Mobile: Hamburger menu with slide-in drawer
- Height: h-20, with py-4 padding

### Hero Section
- Height: min-h-[600px] md:min-h-[700px]
- Full-width background with overlay pattern
- Content: Centered, max-w-4xl
- CTA buttons with blurred backgrounds (backdrop-blur-md)
- Include government emblem/logo prominently

### Service Cards (Agriculture/Food/Drug)
- Card structure: Elevated with shadow-lg, rounded-xl
- Image: aspect-video, rounded-t-xl
- Content padding: p-6
- Icon placement: Absolute top-left with backdrop blur circle
- Hover: Subtle lift with shadow-xl transition

### News Cards
- Compact horizontal layout on desktop (image left, content right)
- Vertical stack on mobile
- Date badge: Absolute positioned, rounded-full
- "More Images →" link with arrow icon
- Spacing: p-4

### Message Cards (DG/PD)
- Two-column layout: Image (30%), Message (70%)
- Image: Rounded-lg with border, grayscale with hover color
- Quote styling with leading quotation mark icon
- Background: Subtle surface elevation

### Calculator Components
- Section header with icon and description
- Input groups with clear labels and helper text
- Result display: Highlighted box with shadow-md, p-6, rounded-lg
- Quality indicators: Badge with rounded-full, px-4 py-2
- Calculate button: Full-width md:w-auto, prominent with shadow
- Reset button: Secondary style, outline variant

### Footer
- Four-column grid on desktop, stacked on mobile
- Sections: About, Quick Links, Services, Contact
- Government seal/logo in footer
- Social media icons: Circular with hover effects
- Copyright bar: Centered, py-4, border-top

## Page-Specific Layouts

### Home Page Structure
1. Hero section with large image and CTA
2. About Us preview (py-16, two-column on desktop)
3. Three service cards in grid (py-16)
4. News & Highlights (py-16, three-column grid)
5. DG/PD Messages side-by-side (py-16)
6. Project Overview with stats (py-16)

### Useful Tools Page (Calculators)
- Tabbed interface for three categories (Food, Agriculture, Drug)
- Each category: Multiple calculator cards in grid-cols-1 md:grid-cols-2
- Calculator card: Expandable accordion or modal pattern
- Input section: Form with validation indicators
- Results section: Prominent display with visual quality indicators
- Documentation: Collapsible "How it works" section below each calculator

### About/Service Pages
- Hero banner: h-[300px] with breadcrumb
- Content: Single column max-w-4xl for readability
- Sidebar (optional): Sticky nav for long pages
- Stats section: Four-column grid with number highlights
- Timeline/Process section: Vertical stepper component

## Images

**Hero Images**:
- Home: Large laboratory/scientific equipment image, 1920x700px minimum
- Service pages: Category-specific lab images (agriculture field, food testing, pharmaceutical lab)
- About: Team or facility exterior/interior shots

**Placement**:
- Hero sections: Full-width background with overlay
- Service cards: Top of card, aspect-video ratio
- News cards: Square or landscape thumbnails
- Team members: Portrait headshots in circular frames
- Gallery sections: Masonry grid or uniform grid

**Image Treatment**:
- Overlay on heroes: gradient or solid with opacity-40 to opacity-60
- Card images: Slight grayscale on hover to color transition
- Government seals: PNG with transparency, consistent sizing

## Accessibility & Usability

- All form inputs: Clear labels above, helper text below, error states with icons
- Calculator results: Text + visual indicators for colorblind users
- Focus states: Clear outline with offset for keyboard navigation
- Mobile touch targets: Minimum h-12 for buttons and links
- Skip to content link for keyboard users
- Semantic HTML with proper heading hierarchy

## Animations (Minimal)

- Page transitions: None (government sites prefer stability)
- Card hovers: Subtle scale (scale-105) and shadow increase
- Button interactions: Gentle opacity change on hover
- Calculator submission: Brief loading spinner, smooth result fade-in
- Scroll reveals: Subtle fade-up on first view (intersection observer)


## Bootstrap Implementation Notes

### Design System Migration
Since we're migrating from Tailwind to Bootstrap, here's how to implement the Material Design-inspired institutional design using Bootstrap's built-in utilities and components:

### Typography System with Bootstrap
- **Font Families**: Already imported via Google Fonts in `index.html`
- **Hierarchy**:
  - H1 (Hero): Use Bootstrap's `display-1` class
  - H2 (Sections): Use `display-5` or `display-6`
  - H3 (Subsections): Use `h3` or `h4` classes
  - Body: Default Bootstrap `p` elements
  - Small Text: Use `small` or `.text-muted`
  - Calculator Labels: Use `Form.Label` with `className="fw-medium text-uppercase"`

### Layout System with Bootstrap
- **Spacing**: Use Bootstrap's spacing utils (`mt-3`, `mb-4`, `p-4`, `py-5`, etc.)
- **Containers**: Use `Container`, `Container fluid` for full-width sections
- **Grid**: Use `Row` and `Col` components with responsive breakpoints
  - Service cards: `<Row className="g-4"><Col lg={4}>...</Col></Row>`
  - News grid: `<Row className="g-4"><Col md={6} lg={4}>...</Col></Row>`
  - Calculator inputs: `<Row className="g-3"><Col md={6}>...</Col></Row>`

### Component Implementation with Bootstrap

**Navigation Bar**
- Use `Navbar` component from `react-bootstrap`
- Fixed top: `fixed="top"`
- Backdrop blur: Add custom CSS `style={{backdropFilter: 'blur(8px)'}}`
- Two-row structure: Use `Container` inside `Navbar` with two separate `div`s

**Hero Section**
- Height: Use inline styles `style={{minHeight: '600px'}}`
- Background image: Use `style={{backgroundImage: 'url(...)'}}`
- Overlay: Use pseudo-element or additional div with `bg-dark` and `opacity-50`
- Content centering: Use `d-flex align-items-center justify-content-center`

**Service Cards**
- Use `Card` component: `<Card className="h-100 shadow-sm hover-shadow">`
- Image: `<Card.Img>` with `variant="top"`
- Icon: Absolute positioned div with rounded background
- Hover effect: Add custom CSS class with transition

**News Cards**
- Use `Card` with horizontal layout on desktop
- Date badge: Use `Badge` component with `bg-primary`
- Image: Use `Card.Img` with proper aspect ratio

**Calculator Components**
- Use `Card` for each calculator
- Input groups: Use `Form.Group` with `Form.Label` and `Form.Control`
- Results: Use `Alert` component with dynamic `variant` prop
- Buttons: Use `Button` component with `variant="primary"`

**Footer**
- Use `Container`, `Row`, `Col` for layout
- Government seal: Regular `img` with fixed width/height
- Social icons: Use `Button` with `variant="link"` and icons