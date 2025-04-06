# CompassCar API - Car Rental Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Alisson-Oliver/ANMAR25_D01_COMPASSCAR/blob/main/LICENSE)

## 📘 Description

The **CompassCar API** is a backend solution designed for managing car rentals in the **Compass Car** application. It supports operations such as create, read, update, and delete vehicles. Built with Express.js and Node.js, it uses the MySQL relational database.

## 💻 Technologies

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## 📦 Installation

### Prerequisites

- **Node.js** installed
- Package manager (**npm** or **yarn**)
- **MySQL** database setup

## ⚙️ Setting Up the Database

### If the Database Has Not Been Created Yet

Run the SQL below in your MySQL instance:

```sql
CREATE DATABASE IF NOT EXISTS compasscar;

USE compasscar;

CREATE TABLE cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    plate VARCHAR(8) NOT NULL UNIQUE,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cars_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    car_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id)
);
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following content:

```env
DB_NAME=compasscar
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
SV_PORT=3000
```

> Adjust the values according to your local environment.

## ▶️ Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Alisson-Oliver/ANMAR25_D01_COMPASSCAR.git
   ```

2. Install dependencies:

   ```bash
   cd ANMAR25_D01_COMPASSCAR
   npm install
   ```

3. Configure the `.env` file:

   ```env
   DB_NAME=<your-db-name>
   DB_USER=<your-db-user>
   DB_PASSWORD=<your-db-password>
   DB_HOST=<your-db-host>
   SV_PORT=<your-server-port>
   ```

4. Start the server:

   ```bash
   npm start
   ```

The API will be running on the defined port.

## 🌐 API Endpoints

### 1. `GET /api/v1/cars`

**Description:** List all registered cars with pagination and optional filters.

#### Query Parameters (all optional):

| Param         | Example | Description                                                               |
| ------------- | ------- | ------------------------------------------------------------------------- |
| `year`        | `2020`  | Returns cars with `year >= 2020`                                          |
| `final_plate` | `3`     | Returns cars where the last digit of the plate is `3`                     |
| `brand`       | `es`    | Returns cars whose `brand` contains the substring "es" (case-insensitive) |
| `page`        | `4`     | Defines the result page (default = 1 if not sent or invalid)              |
| `limit`       | `2`     | Number of items per page (default = 5, min = 1, max = 10)                 |

#### Example Request

```http
GET /api/v1/cars?year=2017&final_plate=0&brand=hon&page=2&limit=2
```

#### Successful Response (with data)

```json
{
  "count": 13,
  "pages": 7,
  "data": [
    {
      "id": 7,
      "brand": "Brand 07",
      "model": "Model 07",
      "year": 2017,
      "plate": "ABC-1D23",
      "created_at": "2024-11-03T16:30:59.000Z"
    },
    {
      "id": 8,
      "brand": "Brand 08",
      "model": "Model 08",
      "year": 2018,
      "plate": "XYZ-1200",
      "created_at": "2024-11-04T17:30:59.000Z"
    }
  ]
}
```

#### Response (no data found)

```json
{
  "count": 0,
  "pages": 0,
  "data": []
}
```

### 2. `GET /api/v1/cars/:id`

**Description:** Retrieve a specific car by its `id`. Returns full car details, including any associated items.

#### Path Parameters

| Parameter | Type    | Required | Description                |
| --------- | ------- | -------- | -------------------------- |
| `id`      | Integer | Yes      | The ID of the car to fetch |

#### Example Request

```http
GET /api/v1/cars/1
```

#### Successful Response (Car found)

If a car with the given `id` exists, the API responds with status 200 and the car's details. The `items` array may be empty or contain values.

**With items:**

```json
{
  "id": 1,
  "brand": "Brand",
  "model": "Model",
  "year": "Year",
  "plate": "ABC-1D23",
  "created_at": "2024-11-04T17:30:59.000Z",
  "items": [
    "Air Conditioning", 
    "Electric Locks", 
    "Electric Windows"
   ]
}
```

**Without items:**

```json
{
  "id": 1,
  "brand": "Brand",
  "model": "Model",
  "year": "Year",
  "plate": "ABC-1D23",
  "created_at": "2024-11-04T17:30:59.000Z",
  "items": []
}
```

#### Error Response (Car not found)

If no car with the provided `id` is found in the database:

- **Status:** `404`
- **Body:**

```json
{
  "errors": [
    "car not found"
 ]
}
```

### 3. `PUT /api/v1/cars/:id/items`

**Description:** This endpoint is used to create or update a car’s items. It replaces any existing items with the new ones provided in the request.

#### Path Parameters

| Parameter | Type    | Required | Description             |
| --------- | ------- | -------- | ----------------------- |
| `id`      | Integer | Yes      | ID of the car to update |

#### Request Body

Must be a non-empty array of item strings.

**Example:**

```json
[
    "Air Conditioning", 
    "Electric Locks", 
    "Electric Windows"
]
```

#### Validation Rules

| Rule                           | Message                        |
| ------------------------------ | ------------------------------ |
| Not an array or an empty array | "items is required"            |
| More than 5 items              | "items must be a maximum of 5" |
| Duplicate values in the array  | "items cannot be repeated"     |

If any validation rule fails:

- **Status:** `400`
- **Body:**

```json
{
  "errors": [
    "items is required",
    "items must be a maximum of 5",
    "items cannot be repeated"
  ]
}
```

#### Car Not Found

If no car with the provided `id` exists:

- **Status:** `404`
- **Body:**

```json
{
  "errors": [
    "car not found"
 ]
}
```

#### Successful Update

If the request is valid and the car exists, its previous items will be replaced with the new ones.

- **Status:** `204 No Content`
- **Body:** _(empty)_

### 4. `POST /api/v1/cars`

**Description:** This endpoint is used to register a new car. It will validate the input, check for duplicates, and return appropriate responses.

#### Request Body

```json
{
  "brand": "Brand",
  "model": "Model",
  "year": 2018,
  "plate": "ABC-1D23"
}
```

#### Validation Rules

If any rule is violated, return:

- **Status:** `400 Bad Request`
- **Body:**

```json
{
  "errors": [
    "brand is required",
    "model is required",
    "year is required",
    "plate is required",
    "year must be between 2016 and 2026",
    "plate must be in the correct format ABC-1C34"
  ]
}
```

| Field   | Rule                                                                               | Message                                        |
| ------- | ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| `brand` | Required                                                                           | "brand is required"                            |
| `model` | Required                                                                           | "model is required"                            |
| `year`  | Required                                                                           | "year is required"                             |
| `plate` | Required                                                                           | "plate is required"                            |
| `year`  | Must be between current year + 1 and 10 years ago (e.g., 2016–2026 if now is 2025) | "year must be between 2016 and 2026"           |
| `plate` | Must match the format `ABC-1C34`                                                   | "plate must be in the correct format ABC-1C34" |

**Plate Format Rule:**

- Format: `ABC-1C34`
- Details:
  - First 3 characters: letters A-Z
  - Followed by a dash (`-`)
  - Then: 1 digit (0-9), 1 letter (A-J) or digit (0-9), and 2 digits (0-9)

**Examples of valid plates:**

- `XYZ-1J00`
- `ABC-1234`

#### Duplicate Car (Same Plate)

If a car with the same plate is already registered:

- **Status:** `409 Conflict`
- **Body:**

```json
{
  "errors": [
    "car already registered"
 ]
}
```

#### Successful Registration

When all validations pass and the car is registered:

- **Status:** `201 Created`
- **Body:**

```json
{
  "id": 1,
  "brand": "Brand",
  "model": "Model",
  "year": 2018,
  "plate": "ABC-1D23",
  "created_at": "2024-11-04T17:30:59.000Z"
}
```

### 5. `PATCH /api/v1/cars/:id`

**Description:** This endpoint allows partial updates to an existing car. All fields are optional but must follow validation rules when provided.

#### Request Body (All fields optional)

```json
{
  "brand": "Brand",
  "model": "Model",
  "year": 2018,
  "plate": "ABC-1D23"
}
```

#### Validation Rules

If any rule is violated, return:

- **Status:** `400 Bad Request`
- **Body:**

```json
{
  "errors": [
    "model must also be informed",
    "year must be between 2016 and 2026",
    "plate must be in the correct format ABC-1C34"
  ]
}
```

| Field   | Rule                                                                 | Message                                        |
| ------- | -------------------------------------------------------------------- | ---------------------------------------------- |
| `model` | If `brand` is provided, `model` must also be provided                | "model must also be informed"                  |
| `year`  | Same validation as in car creation: between 2016 and 2026            | "year must be between 2016 and 2026"           |
| `plate` | Same validation as in car creation: must match the format `ABC-1C34` | "plate must be in the correct format ABC-1C34" |

**Note:**

- If any field is sent as `null`, an empty string (`""`), or `undefined`, it must be ignored (not validated or updated).
- Exception: If `brand` is provided, `model` must also be present and valid.

#### Duplicate Plate

If a car with the same plate already exists:

- **Status:** `409 Conflict`
- **Body:**

```json
{
  "errors": [
    "car already registered"
 ]
}
```

#### Car Not Found

If no car with the provided ID exists:

- **Status:** `404 Not Found`
- **Body:**

```json
{
  "errors": [
    "car not found"
 ]
}
```

#### Successful Update

If all validations pass and the car is updated:

- **Status:** `204 No Content`
- **Body:** _(No content)_

### 6. `DELETE /api/v1/cars/:id`

**Description:** This endpoint permanently deletes a car and all its associated items from the database.

#### Car Not Found

If no car with the provided ID exists:

- **Status:** `404 Not Found`
- **Body:**

```json
{
  "errors": [
    "car not found"
 ]
}
```

#### Successful Deletion

If the car is successfully deleted:

- **Status:** `204 No Content`
- **Body:** _(No content)_

## 🤝 Contribution

### Workflow

1. Create a branch using Git Flow naming conventions.
2. Make your changes.
3. Commit using [Conventional Commits](https://www.conventionalcommits.org/).
