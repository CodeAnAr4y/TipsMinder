# Tips-Minder

A modern **Single Page Application (SPA)** built with **Angular 21** using **Vite** as a build tool.
The project demonstrates best practices for Angular architecture, asynchronous data handling, UI development with Tailwind CSS, and data visualization using ECharts.

The application fetches data from the **DummyJSON API** and provides a structured dashboard with cards, tables, charts, and transaction details.
Additionally, it includes an **extra real-time chat module implemented with WebSocket over ws.ifelse.io**.

---

# Live Demo

Deployment example (replace with your link):

```
https://your-project-name.vercel.app
```

The project deployed to GitHub Pages

---

# Features

* Modern **Angular 21** architecture
* **Vite** build system for fast development
* **Tailwind CSS** UI styling
* **ECharts** for data visualization
* **DummyJSON API** integration
* **Routing with Angular Router**
* Modular and clean project structure
* Strict TypeScript configuration
* Real-time **WebSocket chat module**

---

# Application Modules

### Dashboard (Cards)

Displays summarized financial or transactional information.

### Transaction Table

Shows tabular transaction data retrieved from DummyJSON API.

### Charts

Interactive charts built using **ECharts** for visual analytics.

### Details Page

Detailed information about selected data entries.

### Contract Page

Additional structured page with contract signing form.

### Chat Module (Extra)

A real-time chat implemented with WebSocket.

WebSocket endpoint:

```
wss://ws.ifelse.io
```

---

# Tech Stack

Main technologies used in the project:

* Angular 21
* Vite
* TypeScript
* Tailwind CSS
* ECharts
* WebSocket API

---

# Dependencies

Key project dependencies include:

* `@angular/core`
* `@angular/router`
* `echarts`
* `tailwindcss`
* `rxjs`

Development dependencies:

* `vite`
* `typescript`
* `postcss`

---

# Project Structure

Example of the main project structure:

```
src
 ├── app
 │   ├── components
 │   │   ├── chat
 │   │   ├── header
 │   │   ├── footer
 │   │   ├── transaction-chart
 │   │   └── transaction-table
 │   │
 │   ├── pages
 │   │   ├── cards
 │   │   ├── contract
 │   │   └── details
 │   │
 │   ├── services
 │   ├── models
 │   ├── pipes
 ├── app.config.ts
 ├── app.css
 ├── app.html
 ├── app.routes.ts
 ├── app.spec.ts
 ├── app.ts
 ├── environments
 ├── index.html
 ├── styles.css
 └── main.ts
```

The project follows **Angular best practices** with clear separation of:

* components
* pages
* services
* models
* pipes

---

# Data Source

Application data is fetched from:

DummyJSON API

```
https://dummyjson.com
```

It provides mock data used for demonstrating:

* tables
* card statistics

---

# Installation

Clone the repository:

```
git clone https://github.com/CodeAnAr4y/TipsMinder.git
```

Navigate to the project directory:

```
cd tips-minder
```

Install dependencies:

```
npm install
```

---

# Running the Project

Start the development server:

```
ng serve -o
```

The application will be available at:

```
http://localhost:4200
```

---

# Build

To create a production build:

```
npm run build
```

The build output will be generated in the `dist` folder.

---

# Code Quality

The project follows strict coding rules:

* Strong TypeScript typing
* Angular best practices
* Modular architecture
* Clear and readable project structure

---

# Extra Feature – WebSocket Chat

The application includes a simple real-time chat module that connects to a WebSocket server:

```
wss://ws.ifelse.io
```

Features:

* Send messages
* Receive real-time responses
* Simple UI chat component

---

# Author

Developer: Artur Sultanov

GitHub:

```
https://github.com/CodeAnAr4y
```
