# Story Website

This project is a website that displays stories. It uses a custom element `<the-story>` to render each story, and Navigo for routing.

## Project Structure

- `app.js`: Sets up routing and initializes the `<the-story>` custom element.
- `components/story.js`: Defines the `<the-story>` custom element, which fetches and displays story content.
- `stories/`: Contains JSON files with story data.

## How to Use

1.  **Navigation:** The website uses a single-page application (SPA) structure. Navigation is handled by Navigo, and the URL hash is used to navigate between stories.
2.  **Story Display:** Each story is displayed using the `<the-story>` custom element. The element fetches story data from a JSON file based on the URL slug.
3.  **Responsive Design:** The layout is responsive and adapts to different screen sizes.

## Custom Element: `<the-story>`

The `<the-story>` custom element is responsible for:

- Fetching story data from JSON files.
- Rendering the story content, including title, author, and story text.
- Displaying an image related to the story.
- Providing navigation links to the previous and next stories.
- Handling responsive layout changes.

## Technologies Used

- JavaScript
- Custom Elements API
- Navigo Router
- CSS

## Getting Started

To run this project locally:

1.  Clone the repository.
2.  Open `index.html` in your browser.
