# Joanna Martindale — Personal Website

Welcome to my personal website, **My Little Corner**. This website introduces me, showcases my experience and interests, and provides a way to get in touch with me.

The project is built using HTML, CSS and JavaScript, with a responsive design and interactive elements. It is a work in progress, and I plan to continue developing its content and features.

## Table of Contents

- [About the Project](#about-the-project)
- [Website Features](#website-features)
- [Pages and File Structure](#pages-and-file-structure)
- [Technologies Used](#technologies-used)
- [Design and Responsiveness](#design-and-responsiveness)
- [Interactive Features](#interactive-features)
- [Getting Started](#getting-started)
- [Deployment with GitHub Pages](#deployment-with-github-pages)
- [Future Improvements](#future-improvements)
- [Author](#author)

## About the Project

This website is a personal portfolio designed to introduce me and provide an overview of my background, experience, interests and contact information.

It also serves as an opportunity to develop my web development skills and explore how HTML, CSS and JavaScript can be combined to create an engaging and accessible user experience.

The website uses a dark colour scheme with burgundy, rose and olive accents, alongside responsive layouts, subtle animations and interactive content panels.

## Website Features

- Personal introduction and biography.
- Experience section with interactive description panels.
- Interests and creative pursuits presented as clickable cards.
- Contact page with links to professional profiles and a message form.
- Navigation tabs for moving between website sections.
- Curriculum vitae (CV) access.
- Responsive layouts for desktop, tablet and mobile screens.
- Hover effects, transitions and animated elements.

## Pages and File Structure

The project contains a homepage and five additional HTML pages.

| File | Purpose |
|---|---|
| `index.html` | Homepage introducing the website and providing navigation to the other sections. |
| `Page1.html` | About Me page containing my introduction, biography and academic achievements. |
| `Page2.html` | Experience page displaying clickable experience cards and pop-up descriptions. |
| `Page3.html` | Interests and Creative Pursuits page, featuring an interactive layout of interests and their descriptions. |
| `Page4.html` | Contact page containing contact links and a floating message form. |
| `Page5.html` | Additional page currently containing placeholder content and intended to be developed further. |
| `Joanna_Martindale_CV.pdf` | Suggested filename for the CV PDF, if included in the repository. |
| `joanna.jpg` | Example filename for the profile photograph; use the actual filename referenced by the HTML. |
| `README.md` | Project documentation. |

The HTML files contain their own internal CSS, and pages that require interactive functionality also include JavaScript.

**Note:** The CV and image filenames above are examples of a recommended project structure. Ensure they match the actual filenames used in your HTML code and repository.

## Technologies Used

### HTML5

HTML provides the structure and content of each page, including headings, navigation links, images, experience cards, contact links and forms.

Semantic HTML elements such as `header`, `nav`, `main`, `section` and `footer` help organise the content.

### CSS3

CSS controls the appearance and layout of the website. It is used for:

- Colour palettes and typography.
- CSS Grid and Flexbox layouts.
- Responsive sizing and spacing.
- Gradients, borders and shadows.
- Hover effects and transitions.
- Animations and modal styling.
- Media queries for smaller screens.
- Reduced-motion preferences.

CSS is included in the individual HTML files using internal `<style>` elements.

### JavaScript

JavaScript adds interactive behaviour, including:

- Opening and closing experience description panels.
- Displaying detailed descriptions of interests.
- Controlling the floating contact message form.
- Adding scroll-based animations to experience cards.
- Smooth scrolling to in-page sections.

## Design and Responsiveness

The website uses a consistent visual theme across its pages.

The main design features include:

- **Dark backgrounds:** create a consistent visual foundation.
- **Burgundy and rose accents:** highlight headings, links and interactive elements.
- **Olive accents:** complement the main colour palette.
- **Serif headings:** contrast with the sans-serif body text.
- **Responsive layouts:** use flexible widths, CSS Grid, Flexbox, `clamp()` and media queries to adapt to different screen sizes.
- **Interactive navigation:** hover effects and active-page styling help visitors understand where they are within the website.

The pages also include reduced-motion styling to minimise certain animations for visitors who have requested less motion in their device settings.

## Interactive Features

### Navigation

The navigation tabs allow visitors to move between the homepage, About Me, Experience, Interests and Creative Pursuits, Contact and CV sections.

The current page can be highlighted using the `active` class and the `aria-current="page"` attribute.

### Experience Cards

On the Experience page, visitors can select an experience card to open a description panel. JavaScript updates the panel with the relevant title and description.

The cards also use scroll-based visibility effects where the browser supports the `IntersectionObserver` API.

### Interests and Creative Pursuits

The Interests page presents clickable cards arranged around a central decorative line. Selecting a card opens a floating panel containing further information about the interest.

### Contact Form

The Contact page includes a floating message form with fields for the visitor's name, email address, optional subject and message.

The form is configured to submit to Formspree. Successful email delivery depends on the Formspree endpoint being valid and properly configured.

## Getting Started

### Prerequisites

You will need:

- A web browser, such as Chrome, Edge or Firefox.
- A code editor, such as Visual Studio Code.
- Git and a GitHub account if you want to publish the website using GitHub Pages.

### Running the Website Locally

1. Download or clone the repository.
2. Open the project folder in your code editor.
3. Ensure all referenced images, documents and other assets are present.
4. Open `index.html` in a web browser, or use the Live Server extension in Visual Studio Code.
5. Navigate between the pages using the website's navigation tabs.

Using Live Server is useful when developing the website because it makes it easier to test changes and check that navigation links and interactive features work as expected.

## Deployment with GitHub Pages

GitHub Pages can host this website as a static website.

1. Upload the website files to a GitHub repository.
2. Ensure `index.html` is in the repository's publishing root, or in the configured publishing directory.
3. Include all required HTML files and any images or PDF documents referenced by the website.
4. In the repository, open **Settings → Pages**.
5. Under the build and deployment settings, select **Deploy from a branch** if that is the chosen deployment method.
6. Select the `main` branch and the appropriate folder, usually `/(root)`.
7. Save the settings and wait for the deployment to complete.
8. Open the published URL provided by GitHub Pages and test the website.

### Important Deployment Considerations

- **Use relative file paths.** Links to local files on your computer will not work for visitors to the published website.
- **Check filename capitalisation.** GitHub Pages runs on a case-sensitive environment, so `Page1.html` and `page1.html` may be treated as different files.
- **Include all required assets.** Images and the CV PDF must be uploaded to the repository if the website references them.
- **Check every navigation link.** Verify that each tab opens the intended page on the published website.
- **Test the contact form.** Confirm that the Formspree endpoint is configured and that submissions are received as expected.

## Future Improvements

Potential improvements include:

- Replacing remaining placeholder content with final material.
- Refining the CV page and ensuring the CV opens correctly in a separate tab.
- Further improving keyboard navigation and accessibility.
- Adding more projects and examples of technical work.
- Continuing to refine responsive layouts and interactive effects.

## Author

**Joanna Martindale**

This website is a personal project developed to showcase my background, experience, interests and growing web development skills.

GitHub: [joanna-martindale](https://github.com/joanna-martindale)

---

*Made with care · A work in progress*

