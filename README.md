# Emilist

Emilist is a all in one project management platform built with Next.js 16.2.6 (App Router) and TypeScript, enabling users to post and find jobs, manage projects, post and buy materials, communicate via a message center, and access services and cart functionalities. The application is optimized for SEO, performance, and accessibility, using Tailwind CSS, Shadcn/UI, and DaisyUI for styling, Axios and react-tanstank for external API requests, and Atomic Design for modular UI components.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [SEO Optimizations](#seo-optimizations)
- [License](#license)

## Features

Emilist offers a robust set of features within a dashboard and public landing pages:

- **Jobs**: Post, view, edit, and delete jobs (Direct, Regular, Biddable, Reoccurring). View all jobs, user-applied jobs, user-uploaded jobs, and saved jobs.
- **Projects**: Manage projects created when a user is accepted for a job. View all projects or by ID.
- **Materials**: Upload, view (self-uploaded or others), and like materials. View all materials or user-uploaded materials.
- **Messages**: Communicate via a message center with other users.
- **Cart**: Manage cart-related functionality, add, remove, increase or decrease quantity of materials in cart.
- **Services**: Upload, edit, and view services, set target for your business/service.
- **Dashboard**: Centralized hub for all features.
- **Landing Pages**: Public-facing pages for marketing and user onboarding.
- **Custom UI**: Reusable Modal, Toast, Tooltip, and InfoCard components styled with Tailwind, Shadcn/UI, and DaisyUI.

## Tech Stack

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI, DaisyUI
- **API Requests**: Axios
- **Component Architecture**: Atomic Design (Atoms, Molecules, Organisms, Templates)
- **State Management**: React Context
- **SEO**: Next.js Metadata API, Structured Data (JSON-LD), Sitemap
- **Fonts**: Google Fonts (Inter and exo)
- **Formatting**: Prettier

## Project Structure

The project is organized for modularity, scalability, and maintainability, with no `src` folder:

<pre lang="markdown"> ```bash
my-app/
├── anim/
│ └── _.ts # Reusable animation functions
├── app/
│ ├── [...page].tsx # Dynamic routes for pages
│ ├── layout.tsx # Root layout for the app
│ ├── page.tsx # Home page
│ └── [feature]/ # Feature-specific pages (e.g., jobs/, projects/)
│ └── page.tsx
├── components/
│ ├── atoms/ # Smallest UI components (e.g., Button, Input)
│ │ └── _.tsx
│ ├── molecules/ # Combinations of atoms (e.g., FormField, NavLink)
│ │ └── _.tsx
│ ├── organisms/ # Complex UI components (e.g., Navbar, JobCard)
│ │ └── _.tsx
│ └── templates/ # Page-level layouts combining organisms
│ └── _.tsx
├── features/
│ ├── auth/
│ │ ├── api/ # API calls for authentication
│ │ ├── components/ # Feature-specific components
│ │ ├── constants/ # Auth-specific constants
│ │ ├── hooks/ # Auth-specific hooks
│ │ ├── types/ # Auth-specific TypeScript types
│ │ └── helpers/ # Auth-specific helper functions
│ ├── cart/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── jobs/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── projects/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── materials/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── messages/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── newsletter/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── reports/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── services/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── transactions/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ ├── user/
│ │ ├── api/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── hooks/
│ │ ├── types/
│ │ └── helpers/
│ └── wallets/
│ ├── api/
│ ├── components/
│ ├── constants/
│ ├── hooks/
│ ├── types/
│ └── helpers/
├── lib/
│ ├── constants/ # Global constants reusable across the app
│ ├── context/ # React context for state management
│ ├── helpers/ # General helper functions
│ ├── hooks/ # Reusable hooks for cross-feature logic
│ └── utils.ts # Miscellaneous utility functions
├── public/
│ ├── dummyImages/ # Temporary images to be deleted later
│ ├── icons/ # Icon assets
│ ├── images/ # Permanent image assets
│ └── favicon.ico # App favicon
├── styles/
│ └── global.css # Global CSS styles (Tailwind CSS)
├── types/
│ └── _.ts # General TypeScript type definitions
├── middleware.ts # Next.js middleware for request handling
├── next.config.js # Next.js configuration
├── package.json # Project dependencies and scripts
├── package-lock.json # Lock file for dependency versions
├── README.md # Project documentation
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json # TypeScript configuration
``` </pre>

## Getting Started

This is a Next.js TypeScript application built with a modular architecture, utilizing Atomic Design principles for UI components and a feature-based structure for domain logic. The project includes features like authentication, cart, jobs, projects, and more, styled with Tailwind CSS and enhanced with reusable animation functions. Follow the steps below to set up and run the project locally.

## Prerequisites

Before you begin, ensure you have the following tools installed on your system:

Node.js: Version 18.x or later (LTS recommended). Install from nodejs.org.
npm: Comes with Node.js, but you can also use Yarn or pnpm if preferred.
Git: For cloning the repository. Install from git-scm.com.
Code Editor: A code editor like Visual Studio Code with TypeScript support (e.g., via the ESLint and Prettier extensions).
Terminal: A terminal for running commands (e.g., Command Prompt, PowerShell, or Bash).
Optional: If you plan to work with animations, familiarity with libraries like Framer Motion is helpful.

Ensure your system meets these requirements to avoid compatibility issues.
Installation
Follow these steps to set up the project locally:

### Clone the Repository:

git clone https://github.com/Wills-dev/emilist.git

cd emilist

### Install Dependencies:

Run the following command to install all required packages listed in package.json:

npm install

Alternatively, use yarn install or pnpm install if you prefer a different package manager.

Set Up Environment Variables:Create a .env.local file in the root directory and configure the necessary environment variables (see Environment Variables below).

Verify Setup:Ensure all dependencies are installed correctly and the project structure matches the one described in the Project Structure section.

## Environment Variables

The application requires certain environment variables to function properly, especially for features like authentication, API calls, and third-party integrations. Follow these steps:

Create a .env.local File:In the root of your project, create a file named .env.local.

Add Required Variables:Below is an example of the environment variables you might need. Replace placeholder values with your actual configuration:

### Next.js API base URL (for server-side API calls)

NEXT_PUBLIC_API_BASE_UR=

### Google Maps API KEY

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

## Running the App

Once the setup is complete, you can run the application locally:

Development Mode:Start the Next.js development server with hot reloading:

npm run dev

The app will be available at http://localhost:3000.

Access the App:Open your browser and navigate to http://localhost:3000 to view the app. Explore feature-specific routes (e.g., /jobs, /projects) to interact with the application.

## Debugging:

Check the terminal for error messages if the app fails to start.
Ensure all environment variables are correctly configured.
Verify that the TypeScript configuration (tsconfig.json) and Tailwind CSS setup (tailwind.config.ts) are valid.

Additional Notes

The project uses Tailwind CSS for styling, configured in styles/global.css and tailwind.config.ts.
TypeScript ensures type safety; run npm run lint to check for type errors or code style issues.
If you encounter issues with animations, check the anim/ directory for implementation details.
Feature-specific components and logic are encapsulated in the features/ directory for modularity.

For more details on the project structure, refer to the Project Structure section.
