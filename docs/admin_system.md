# Admin System Documentation

## Overview
The admin system allows the user to modify the content of the portfolio website without touching the code. It uses a simple JSON file as a database.

## Architecture
1.  **Data Storage**: `src/data/portfolio.json`
    - Stores the Hero section title/subtitle.
    - Stores the list of projects.
2.  **API Route**: `src/app/api/portfolio/route.ts`
    - `GET`: Reads the JSON file and returns data.
    - `POST`: Receives new data and overwrites the JSON file.
3.  **Frontend**: `src/app/admin/page.tsx`
    - Fetches data on load.
    - Provides input fields for editing.
    - Sends updated data to the API on "Save".

## Usage
1.  Navigate to `/admin`.
2.  Edit the text fields.
3.  Click "Save Changes".
4.  Go back to the Home page to see the updates.

## Security Note
Currently, there is no authentication. Anyone with access to the `/admin` route can modify the content. For production, it is highly recommended to add:
- Middleware to protect the route.
- A login page with environment variable-based credentials.
