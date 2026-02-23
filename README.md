# 💰 Expense Tracker App

A full-stack web application built with **Next.js** to help users track their daily expenses, categorize transactions, and visualize their spending habits through interactive charts.

## ✨ Features

* **User Authentication:** Secure login and signup functionality using JWT.
* **Dashboard & Analytics:** Visual representation of expenses using horizontal and bar charts.
* **Transaction Management:** Add, view, and organize daily transactions.
* **Categories:** Group transactions by categories for better tracking.
* **Search Functionality:** Easily search through past transactions.
* **Rate Limiting:** Added security on API routes to prevent brute-force attacks.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* **Styling:** Tailwind CSS / Radix UI (via Shadcn/ui)
* **Architecture:** Clean Architecture principles (Separation of Usecases, Services, and Repositories)

---

## 📁 Project Structure & Workflow

This project follows a **Layered Architecture** to ensure the code is scalable and easy to test:



* `app/` - Next.js App Router (Pages, Layouts, and API Routes).
* `components/ui/` - Reusable UI components (Atomic design).
* `usecases/` - **Frontend API Handlers.** Contains the logic for fetching data from internal APIs (e.g., `fetchMonthlyReport`).
* `services/` - **Backend Business Logic.** Processes data before saving or returning it.
* `repository/` - **Data Access Layer.** The only part that performs CRUD operations on **MongoDB**.
* `models/` - TypeScript Interfaces and Data Schemas.

