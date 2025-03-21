# How to run:

- install dependencies with `pnpm`

```
pnpm i
```

- start development app

```
pnpm start
```

- add a timer using the button on-screen

## Bonus Features

- Draggable handle on the radial progress bar was implemented
- Simple animation added to "completed" timers

# Development Process and use of AI

- App was created with create-react-app (typescript template)
- Cursor was used to create an initial timer component with some basic functionality
- I corrected Cursor's initial implementation (pause/unpause behavior, timer drift, behavior when adding +1 minute)
- I refactored component, breaking it into smaller components and moving state management into a custom hook (useTimer.ts), and formatting utils into own utils file (timeUtils.ts)
- I integrated tailwind for CSS (included migrating from CRA to vite) and moved most styles from .css files into tailwind
- I setup vitest and added tests for `timeUtils.ts` and `ProgressCircle.tsx`
- I added the "draggable handle" on the radial progress bar by bringing in and modifying some open source code
- I used Cursor to stub out some tests, then fixed & added certain tests

## Known Bugs / Imperfections

- With limited time, I did not add tests to exercise all areas of the app
- The draggable handle on the radial progress bar is not positioned perfectly, and the positioning of it relies on a "magic number" which should be refactored out (if the size of the container is changed, the handle will be less "on-center")
- The draggable handle should be decoupled from the radial progress bar (so that the progress bar component could be used in situations where it doesn't make sense to allow the user to modify progress directly)
- should consider splitting the `useTimer` custom hook apart into one hook just for managing time updates (timer loop, pause, etc) and another for editing time directly?
- when adding the draggable handle, I introduced some interdependence between the `useDraggable` hook and the `useTimer` hook and would intend to investigate ways to separate these in a cleaner way.
- I'd also like to update the format of the time display so that when only seconds are shown, it shows only 2 digits (instead of e.g. "00:12") in a larger font (text should grow/shrink to fit container), and also to support hours (possibly even days). Improvements to the input would be needed, though.
- Edge cases around timer input should be tested more
