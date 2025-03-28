# Michael Vozzo - Portfolio Website

This is a headless WordPress site built with Next.js 15. It utilises ACF custom post types to render the content.

## Functionality

The page fetches data for posts and projects using asynchronous functions:

* `getPosts()`: Retrieves blog post data.
* `getProjects()`: Retrieves project data.
* `getTags()`: Retrieves tag data for categorization.


## Data Fetching

The `Promise.all` function ensures that all three data fetching operations (`getPosts`, `getProjects`, `getTags`) are executed concurrently, improving performance.


## Dependencies

This file relies on the following dependencies:

* `lucide-react`: For icons.
* `shadcn-ui`: For theming. 
* `next/link`: For internal navigation.
*  Custom components: `Hero`, `AboutMe`, `Posts`, `Button`, `Section`, `Container`, `BeforeAfterSlider`, `Breadcrumbs`, `Navbar` (located within the project).
*  Custom API functions: `getPosts`, `getProjects`, `getTags` (located in `lib/api`).
