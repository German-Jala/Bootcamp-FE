# Yu-Gi-Oh! Card Explorer (Duelist Codex)

This project is an Angular application built using Angular 22.0.0. It allows duelists to search for cards, view card statistics, effects, and prices across different platforms, manage a personal collection secured behind duelist alias registration, and keep candidate cards focused during exploration.

---

## Criterios de Búsqueda y Filtros Disponibles

La aplicación cuenta con una barra de búsqueda dinámica combinada con un sistema de filtros multicriterio integrados en `CardService`:

1. **Búsqueda por Nombre (`fname`)**:
   - Búsqueda en tiempo real mediante la propiedad `searchTerm`.
   - Interoperabilidad RxJS & Signals: Utiliza `toObservable(searchTermInput)` con `debounceTime(350ms)` y `distinctUntilChanged()` reconvertido a `toSignal` para evitar solicitudes HTTP innecesarias mientras el duelista escribe.
2. **Filtro por Tipo (`type`)**:
   - Filtra cartas por su categoría principal o subtipo (ej: *Normal Monster*, *Effect Monster*, *Spell Card*, *Trap Card*, *Fusion Monster*, *XYZ Monster*, *Link Monster*, etc.).
3. **Filtro por Atributo (`attribute`)**:
   - Filtra monstruos por su elemento (ej: *DARK*, *LIGHT*, *FIRE*, *WATER*, *EARTH*, *WIND*, *DIVINE*).
   - Implementado mediante **`linkedSignal`**: Se restablece automáticamente a cadena vacía cuando el tipo seleccionado es *Spell Card* o *Trap Card*, manteniendo al mismo tiempo la capacidad de ser editado directamente por el usuario.
4. **Filtro por Clasificación / Raza (`race`)**:
   - Filtra por raza o tipo de carta secundaria (ej: *Dragon*, *Spellcaster*, *Warrior*, *Fiend*, *Zombie*, *Continuous*, *Counter*, *Equip*, *Quick-Play*, etc.).
5. **Navegación y Paginación (`num`, `offset`)**:
   - Avance y retroceso de páginas dinámico (`limit: 20`, `offset` incrementable/decrementable).
   - Resumen interactivo de filtros activos y botón para limpiar todos los criterios de golpe.
6. **Carta en Foco (`focusedCardState`) - HU-05**:
   - Implementado con **`linkedSignal`** derivado pero editable localmente. Permite marcar/desmarcar la carta como candidata a mazo y agregar notas personales sin perder la selección al cambiar de búsqueda.
7. **Carga Diferida (`@defer`) - HU-06**:
   - La información secundaria de precios de mercado se carga diferida mediante bloques `@defer (on idle)` con un indicador de carga independiente `@loading (minimum 500ms)`.

---

## API Endpoints y Parámetros Utilizados

La aplicación consume los datos de las cartas desde la API pública de **YGOPRODeck**.

* **Base URL**: `https://db.ygoprodeck.com/api/v7/cardinfo.php`

### 1. Obtener Lista de Cartas (Catálogo y Búsqueda Multicriterio)
Utilizado de forma reactiva en `CardService` mediante un `rxResource` para consultar el listado de cartas en tiempo real según los filtros activos.

* **Endpoint**: `GET https://db.ygoprodeck.com/api/v7/cardinfo.php`
* **Parámetros de consulta (Query Parameters)**:

| Parámetro | Tipo | Descripción | Ejemplo / Valor por defecto |
| :--- | :--- | :--- | :--- |
| `num` | `integer` | Número máximo de cartas a retornar por página. | `20` |
| `offset` | `integer` | Desplazamiento inicial para la paginación. | `0`, `20`, `40` |
| `fname` | `string` | Búsqueda difusa (fuzzy search) por nombre de carta. | `Dragon`, `Magician` |
| `type` | `string` | Filtro por tipo o categoría de carta. | `Spell Card`, `Effect Monster` |
| `attribute` | `string` | Filtro por atributo o elemento del monstruo. | `DARK`, `LIGHT`, `FIRE` |
| `race` | `string` | Filtro por raza o clasificación secundaria. | `Dragon`, `Spellcaster` |

### 2. Obtener Detalle de una Carta por ID
Utilizado en el `cardResolver` para cargar de forma anticipada la carta antes de activar la ruta de detalle `/card/:id`.

* **Endpoint**: `GET https://db.ygoprodeck.com/api/v7/cardinfo.php`
* **Parámetros de consulta (Query Parameters)**:

| Parámetro | Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `id` | `integer` / `string` | Identificador único de la carta en la base de datos YGOPRODeck. | `34541863`, `46986414` |

---

## Mapa de Rutas de la Aplicación

| Ruta | Componente | Guard / Resolver | Descripción |
| :--- | :--- | :--- | :--- |
| `/` | `CatalogPage` | Ninguno | Página principal con catálogo, buscador con debounce, filtros combinados, banner de carta en foco y paginación. |
| `/profile` | `ProfilePage` | Ninguno | Configuración de perfil donde el duelista establece su alias. |
| `/collection` | `CollectionPage` | `profileGuard` | Colección personal asegurada. Redirige a `/profile` si el duelista no se ha registrado. |
| `/card/:id` | `DetailPage` | `cardResolver` | Contenedor principal de detalle con pestañas y carga diferida `@defer` de precios de mercado. |
| ├── `/card/:id/effect` | `EffectSection` | Ninguno | Vista hija por defecto con la descripción y texto del efecto. |
| ├── `/card/:id/stats` | `StatsSection` | Ninguno | Muestra estadísticas numéricas (ATK, DEF, Nivel, Atributo, Raza). |
| └── `/card/:id/prices` | `PricesSection` | Ninguno | Muestra precios de referencia (Cardmarket, TCGPlayer, eBay, Amazon). |
| `**` | (Redirección) | Ninguno | Redirección de rutas no reconocidas al catálogo principal (`/`). |

---

## Instrucciones de Ejecución

### Requisitos previos
Node.js instalado en su versión actual.

### Instalación de dependencias
```bash
npm install
```

### Ejecutar Servidor Local
```bash
npm start
```
Navega a `http://localhost:4200/`.

### Ejecutar Pruebas Unitarias
```bash
npm test
```
