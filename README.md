This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm install
npm run dev
```

## Development patterns

### Description of the directories

- `/src` : All the sources
- `/src/app` : We use NextJS App router. See https://nextjs.org/docs/app
- `/src/app/(main)` : Pages that use the main layout
- `/src/app/(flows)` : Pages that use the flows layout
- `/src/app/api` : API routes
- `/src/features`: The application "Features". One subdirectory per feature
- `/src/shared`: Code shared between pages
- `/src/shared/components`: Shared components
- `/src/shared/css`: Global CSS
- `/src/shared/images`: Shared images
- `/src/shared/dal`: Data Access Layer

### CSS

### General

- Use rem instead of px to maintain ratios on devices with different dpis. 1rem = 10px.
- Keep the tailwind approach: minimalistic classes
- Use clsx to combine classes elegantly
- If you feel like you repeat css classes too much in various part in the application, you should use a wrapper component
- Tailwind spacing is set to 0.4rem so for instance `px-2` = Padding x 0.8rem

#### Cards

- Use the .stacked-cards class on a div that contains multiple cards. CSS will do the rest
- Use the .solo-card class to ensure that a solo card has round borders
- USe w-flowcard in flow cards for their width to be correct

### Flows

Flows are components that are often comprised of multiple steps.

Use the Steps component:

- Prepare the flow data in the main component
- Pass the data to the Step components using the data field
