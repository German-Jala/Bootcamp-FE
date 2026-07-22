# Yu-Gi-Oh! Card Explorer

This project is an Angular application built using Angular 22.0.0. It allows duelists to search for cards, view card statistics, effects, and prices across different platforms, and manage a personal collection secured behind duelist alias registration.

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

---

## API Endpoints Used

The application retrieves card data from the public **Yu-Gi-Oh! API by YGOPRODeck**.

* **Base URL**: `https://db.ygoprodeck.com/api/v7/cardinfo.php`

### 1. Get Cards List (Catalog Page)
Used dynamically in `CardService` through a reactive `rxResource` to query the list of cards.
* **Endpoint**: `GET /cardinfo.php`
* **Query Parameters**:
  * `num` (integer): Number of items to retrieve per page (default: `20`)
  * `offset` (integer): Pagination offset (default: `0`)
  * `fname` (string): Fuzzy search term for searching cards by name (optional)

### 2. Get Card Details by ID (Card Details Page)
Used in the `cardResolver` to pre-fetch card data before activating the details route.
* **Endpoint**: `GET /cardinfo.php`
* **Query Parameters**:
  * `id` (integer/string): Unique card identifier

---

## Application Route Map

The application defines the following standalone and child routes:

| Route Path | Component | Guard / Resolver | Description |
| :--- | :--- | :--- | :--- |
| `/` | `CatalogPage` | None | Main landing page displaying the card catalog grid, search box, and pagination. |
| `/profile` | `ProfilePage` | None | Profile configuration view where the duelist sets their alias. |
| `/collection` | `CollectionPage` | `profileGuard` | Secured personal collection grid showing only the cards saved by the duelist. If no profile alias exists, redirects to `/profile`. |
| `/card/:id` | `DetailPage` | `cardResolver` | Card detail container. Resolves the card data by ID before loading to avoid layout flickering. |
| ├── `/card/:id/effect` | `EffectSection` | None | Default child view showing the card description/text and key type badges. |
| ├── `/card/:id/stats` | `StatsSection` | None | Displays numerical and classification stats like ATK, DEF, Level, Attribute, and Race. |
| └── `/card/:id/prices` | `PricesSection` | None | Displays reference prices from Cardmarket, TCGPlayer, eBay, and Amazon formatted via the `cardPrice` pipe. |
| `**` | (Redirect) | None | Wildcard catch-all redirecting unrecognized paths back to the Catalog page (`/`). |
