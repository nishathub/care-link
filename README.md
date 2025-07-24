# CareLink — A Full-Stack Charity Management Platform

A modern, full-stack **Next.js** charity management platform built to help people in need on a small, local scale. **CareLink** makes it easy for anyone to support genuine cases transparently and securely.

Anyone can apply to become a **volunteer** through the website. After verification, an **admin** approves the application. Approved **volunteers** can submit details of needy cases through a secure **dashboard** form. These stories are stored in **MongoDB** and wait for **admin** review. Once verified, the **admin** publishes the case on the public site.

Visitors can browse approved cases and donate securely using **Stripe Checkout**. When a case is solved, it’s published as a **success story** to build trust and show impact. A simple **news section** keeps the community updated about progress and future plans.

Behind the scenes, **CareLink** uses **custom authentication and authorization**, **protected API routes**, **bcrypt** for password security, **Zustand** for state management, **Nodemailer** for automated emails, and the **Next.js App Router** for smooth routing and API handling. Dynamic UI elements like **Swiper sliders**, custom **loaders**, and **modals** create a modern, user-friendly experience.

---

## Features

### Authentication & Authorization
- Custom **JWT-based** user registration & login
- **bcrypt** password hashing for secure credentials
- Central **Next.js middleware** to protect API routes and pages

### Donation Management
- Accept real-time donations with **Stripe Checkout**
- Automated confirmation emails using **Nodemailer**
- Donation records securely stored in **MongoDB**

### Admin Panel
- Manage users and donations through protected admin routes
- Role-based access control for admins, editors, and volunteers
- Analytics-ready backend structure for future dashboards

### Modern Tech Stack

| Frontend        | Backend               | Database | Integrations & Tools           |
|-----------------|-----------------------|----------|--------------------------------|
| **Next.js App Router** | Next.js API Routes | MongoDB  | **Stripe**, **Nodemailer**     |
| Zustand (State Mgmt) | Custom Middleware |          | Swiper.js, Axios               |
| Tailwind CSS    | JWT Auth, bcrypt      |          | Custom Modals, Loaders, Spinners |

---

## Dynamic UI & Components

-  **Custom Alerts & Modals** — Reusable components for consistent UX
-  **Loading Spinner** — Smooth loading feedback for API operations
-  **Swiper Slider** — Dynamic image sliders for campaign showcases
-  **Protected Routes** — Centralized middleware ensures secure access

---

## Backend Highlights

- Built-in **Next.js API** for server-side operations
- Secure authentication with **JWT**, **bcrypt**, and custom logic
- Automated email system using **Nodemailer**
- **Stripe** integration for trusted payment processing

---

## Roadmap

- [ ] Admin dashboard with donation analytics
- [ ] Email templates for different triggers (registration, donation receipt)
- [ ] Pagination & advanced search for donation records
- [ ] User profile pages with donation history

---

## Author

**Ashraf Ali**  
MERN Stack Developer  

- [Portfolio](https://ashraf-portfolio-wd.web.app)
- [Resume](https://docs.google.com/document/d/1Z7rp08uI8xHl0tulbbvn0-K1c9otI0mfOo34c2c8djM/edit?usp=sharing) 
- [LinkedIn Profile](https://www.linkedin.com/in/ashrafalibutex42)  
- [Github Profile](https://github.com/nishathub)  
- [Email](mailto:ashraf.ali.butex42@gmail.com)  

---

## Live Demo

- **Live Site:** [CareLink Live](https://care-link-ebon.vercel.app/)

---

## Tech Keywords

`nextjs` `fullstack` `jwt-auth` `bcrypt` `stripe` `nodemailer` `zustand` `mongodb` `tailwindcss` `swiperjs`

