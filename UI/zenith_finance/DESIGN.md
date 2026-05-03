---
name: Zenith Finance
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e3e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  numeric-display:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  safe-area-inset: 16px
  gutter: 16px
---

## Brand & Style

The design system focuses on "Financial Mindfulness"—a state of calm, clarity, and control over one's personal economy. The target audience consists of busy professionals and minimalists who require a frictionless way to log data without cognitive overload.

The aesthetic follows a **Modern Minimalist** approach. It prioritizes extreme whitespace and functional clarity, stripping away non-essential decorations to ensure the user's data remains the focal point. The interface is optimized for speed and one-handed "thumb-zone" interaction, ensuring that the act of tracking expenses feels like a seamless habit rather than a chore.

## Colors

The palette is rooted in soft neutrals to reduce visual fatigue. The primary color is a deep, near-black for high-contrast text and primary actions, while the secondary color is a muted slate for auxiliary information.

Semantic colors are utilized with purpose:
- **Income (Success):** A sophisticated forest green that suggests growth without being neon.
- **Expense (Error):** A soft, earthy terracotta red that draws attention to outflows without creating anxiety.
- **Surface Tones:** A range of ultra-light grays are used to differentiate content blocks without the need for heavy borders.

## Typography

This design system utilizes **Manrope** for its exceptional legibility and modern, balanced proportions. As a finance-focused tool, numeric clarity is paramount; Manrope offers clean numerals that align perfectly in tabular data and large displays.

Hierarchy is established through weight and size rather than color. Large "Numeric Display" styles are reserved for account balances, while "Label-sm" is used for metadata like categories or timestamps. Letter spacing is slightly tightened on headlines to maintain a compact, premium feel.

## Layout & Spacing

The design system employs a **Fluid Grid** model optimized for mobile viewports. A standard 16px (md) safe-area margin is maintained on the left and right edges of the screen.

The layout philosophy emphasizes the "Lower Third" of the screen for interactivity. All primary touch targets (Floating Action Buttons, Navigation, and Input Confirmations) are placed within easy reach of the thumb. Vertical rhythm is strictly enforced using multiples of 8px to ensure a clean, mathematical scanability.

## Elevation & Depth

This design system avoids heavy shadows and skeuomorphism in favor of **Tonal Layers** and **Low-contrast Outlines**. 

Depth is communicated through color-stepping:
- **Level 0 (Canvas):** The pure white background.
- **Level 1 (Cards/Containers):** An ultra-light gray (#F9F9F9) or a 1px hairline border (#EEEEEE) to define space.
- **Level 2 (Modals/Overlays):** These use a soft "Ambient Shadow"—a 15% opacity tint of the primary color with a 30px blur—to suggest they are floating above the main interface.
- **Level 3 (FAB):** The Floating Action Button uses the highest contrast and a subtle elevation shadow to denote its priority.

## Shapes

The shape language is "Friendly Professional." Elements utilize a **Rounded** (0.5rem base) corner radius to soften the technical nature of financial data.

- **Standard Cards:** 1rem (rounded-lg) for a modern, containerized look.
- **Buttons & Inputs:** 0.5rem for a stable, clickable appearance.
- **Floating Action Buttons:** 1.5rem (rounded-xl) or fully pill-shaped to distinguish them from content cards and highlight their interactive nature.

## Components

### Bottom Navigation
The primary anchor of the app. It uses high-legibility icons with 12px labels. The active state is indicated by a weight change in the icon and a primary color tint, avoiding distracting backgrounds.

### Floating Action Button (FAB)
Positioned at the bottom center or bottom right. It is the only element that may use a solid primary color background to ensure it stands out for quick transaction entry.

### Simplified Cards
Cards are used for individual transactions and account summaries. They omit borders in favor of subtle background fills. Amounts are right-aligned, while category icons are housed in soft-colored circles on the left.

### Data Visualizations
Charts should be "distilled." Use donut charts for category breakdowns and simple line graphs for spending trends. Avoid grids and axes where possible; instead, use labels only for peak and valley data points to maintain the minimal aesthetic.

### Input Fields
Fields are full-width with a focus on large, "Numeric-display" typography for the currency amount. Labels float above the input to ensure context is never lost during data entry.