# Specialist Psychologist Lokman Yılmaz - Web Project Technical Design Document

This document outlines the technical structure, design system, and page details for the "Specialist Psychologist Lokman Yılmaz" web project. It is intended to be used as a reference for AI-based design tools (v0, Midjourney, etc.) to generate interface designs.

## 1. Project Overview

- **Project Name:** Specialist Psychologist Lokman Yılmaz Website
- **Purpose:** Corporate website, blog, appointment system, and administration panel for a psychologist and family counselor.
- **Target Audience:** Individuals, couples, and families seeking psychological support.
- **Technology Stack:**
  - **Framework:** Next.js 14+ (App Router)
  - **Language:** TypeScript
  - **Styling:** Tailwind CSS
  - **UI Library:** Shadcn UI (Radix UI based)
  - **Icons:** Lucide React
  - **Database/Auth:** Supabase
  - **Forms:** React Hook Form + Zod

## 2. Design & Atmosphere (AI Instruction)

**Instruction for the AI Designer:**
Please select a color palette and design atmosphere suitable for a professional psychologist's website.

- **Atmosphere:** The design should feel calm, trustworthy, professional, and soothing. Avoid overly aggressive or bright colors.
- **Colors:** Use soft, neutral tones (e.g., soft blues, greens, warm grays, or earth tones) that promote relaxation and trust.
- **Style:** Minimalist, clean, and modern. Use plenty of whitespace to create a sense of openness.
- **UI Components:** The project uses Shadcn UI components (Radix UI based). Please ensure the design is compatible with the default Shadcn UI structure (rounded corners, clean borders, simple shadows) but customized with your chosen color palette.

## 3. Site Map & Navigation

### 3.1. Public (Visitor) Pages

- **Home (`/`):** Landing page.
- **Blog (`/blog`):** List of blog posts.
- **Blog Detail (`/blog/[slug]`):** Single blog post page.
- **Contact (`/contact`):** Contact information and form.
- **Book Appointment (`/appointment`):** Appointment booking wizard.
- **Sign In (`/sign-in`):** Admin login page.

### 3.2. Protected (Admin) Pages

- **Dashboard / Appointments (`/admin`):** Appointment calendar and list.
- **Available Times (`/admin/available-times`):** Management of available appointment slots.
- **Blog Management (`/admin/blog`):** Add/Edit/Delete blog posts.
- **Messages (`/admin/messages`):** Messages received from the contact form.
- **Services (`/admin/services`):** Service list management.

## 4. Page Details & Components

### 4.1. Header (Top Menu)

- **Layout:** `sticky top-0`, full width, content within `container`.
- **Left:** Logo (Text: "Uzman Psk. Lokman Yılmaz").
- **Center (Desktop):** Navigation links (Home, Blog).
- **Right (Desktop):** Action buttons:
  - "Contact" (Outline Button, Phone icon).
  - "Book Appointment" (Primary Button, Calendar icon).
- **Mobile:** Hamburger menu (Vertical list inside a Sheet component).

### 4.2. Footer

- **Background:** Dark color (chosen by AI), light text.
- **Column 1 (Contact):** Address, Phone, Email (with icons).
- **Column 2 (Quick Links):** Home, Blog, Contact, Book Appointment.
- **Column 3 (Social Media):** Icons (Instagram, LinkedIn, etc.).
- **Bottom:** Copyright text.

### 4.3. Home Page (`/`)

1.  **Hero Section:**
    - Background: Light/Soft color.
    - Content: Large headline ("Samsun Atakum Psychologist..."), description text, "Book Appointment" button (Primary).
    - Alignment: Center aligned.
2.  **Services Section:**
    - Headline: "Our Services".
    - Grid Structure: 3-column cards.
    - Card Content: Service name (bold), short description.
3.  **Blog Section:**
    - Headline: "Blog".
    - Grid Structure: 3-column cards.
    - Card Content: Cover image, title, summary, date, "Read More" link.
4.  **Contact CTA Section:**
    - Simple call-to-action area, "Book Appointment" and "Contact Me" buttons.

### 4.4. Appointment Page (`/appointment`)

- **Structure:** Step-by-step form (Wizard) or single page form.
- **Components:**
  - **Calendar:** For date selection (`react-day-picker` / Shadcn Calendar).
  - **Time Selection:** Button group or select for available time slots.
  - **Personal Info Form:** Name, Surname, Phone, Email, Note (Input and Textarea).
  - **Confirmation:** Summary and submit button.

### 4.5. Blog Detail Page (`/blog/[slug]`)

- **Header:** Post title, publish date, author.
- **Image:** Wide cover image.
- **Content:** Rich text content, typographic styling (`prose` class).
- **Share:** Social media share buttons.

### 4.6. Contact Page (`/contact`)

- **Layout:** Two columns (Desktop).
- **Left:** Contact info (Address, Map, Phone, Email).
- **Right:** Contact Form (Name, Surname, Email, Subject, Message).

### 4.7. Admin Panel (`/admin`)

- **Layout:**
  - Top navigation bar (Links: Appointments, Available Times, Blog, Messages, Services).
  - Top right "Sign Out" button.
- **Appointments Page:**
  - Data Table: Date, Time, Client Name, Status, Actions.
  - Filtering: By date, by status.
- **Blog Management:**
  - List: Blog posts table.
  - Add/Edit: Tiptap editor integration (Rich text editor), image upload area.
- **Available Times:**
  - Bulk add form (Start-End date, Days, Time ranges).
  - List: List of existing slots and delete button.

## 5. Technical Requirements & Constraints

- **Responsive:** All pages must be compatible with mobile, tablet, and desktop.
- **Performance:** Images must be optimized (`next/image`), avoid unnecessary re-renders.
- **SEO:** Semantic HTML tags (`header`, `main`, `section`, `article`, `footer`) must be used.
- **Accessibility:** Color contrast and keyboard navigation must be considered.
