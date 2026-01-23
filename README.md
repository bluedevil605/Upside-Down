# Upside Down Portfolio 🌲🔦

A cinematic, immersive developer portfolio inspired by **Stranger Things**. Built with modern web technologies to deliver a unique 3D and interactive user experience.

![Project Banner](public/og-image.png) <!-- Ideally would check if this exists or remove -->

## ✨ Features

-   **Cinematic Entrance**: Custom loading screen with "Upside Down" spores and floating particles.
-   **3D Elements**: Interactive 3D objects using **React Three Fiber**.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
-   **Interactive Contact Form**: Integrated with **EmailJS** for direct email delivery without a backend.
-   **Smooth Animations**: Powered by **Framer Motion** for a seamless feel.

## 🛠️ Tech Stack

-   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
-   **Email Service**: [EmailJS](https://www.emailjs.com/)

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/bluedevil605/Upside-Down.git
    cd Upside-Down
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Configuration

To make the Contact Form work, you need to configure EmailJS.

1.  Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env # or just create it
    ```

2.  Add your EmailJS credentials (get them from [emailjs.com](https://www.emailjs.com/)):
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

> **Note**: The repository has a `.gitignore` to protect your secrets. Do not commit your `.env` file.

### Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  **Important**: Add the Environment Variables (`VITE_EMAILJS_...`) in the Vercel Project Settings.
4.  Deploy!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).