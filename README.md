# Yu-Gi-Oh! Card Explorer

This project is an Angular application built using Angular 22.0.1.

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
Install the project dependencies:
```bash
npm install
```

### Running the Project
To start the local development server, run:
```bash
npm start
```
Or:
```bash
ng serve
```

Once the server is running, navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

## API Endpoints Used

The application retrieves card data from the public **Yu-Gi-Oh! API by YGOPRODeck**.

* **Base URL**: `https://db.ygoprodeck.com/api/v7/cardinfo.php`

### Used Endpoints:
1. **Get Cards List (with pagination and optional search):**
   * **Endpoint**: `GET /cardinfo.php`
   * **Query Parameters**:
     * `num`: Number of items to retrieve (default: `20`)
     * `offset`: Pagination offset (default: `0`)
     * `fname`: Fuzzy search term for searching cards by name (optional)

2. **Get Card Details by ID:**
   * **Endpoint**: `GET /cardinfo.php`
   * **Query Parameters**:
     * `id`: Unique identifier of the card

## Internal Routes

The application defines the following client-side routes:

* **`/` (Root / Catalog)**: Displays the main card catalog with search capabilities and pagination.
* **`/card/:id` (Card Details)**: Displays detailed information about a specific card, identified by its `id`.
* **`**` (Catch-all)**: Redirects any undefined or wildcard URL paths back to the Catalog page (`/`).
