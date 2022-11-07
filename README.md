## Issues with Workspaces and Symlinks

### TypeScript

1. new-ui based on Create React App 5.0.1 - running react-scripts 5.0.1
1. new-ui.generated.ts - `@sj-test/server-api-src`
    - uses absolute imports internally
    - produces a package `@sj-test/server-api`, at [/lib/](./ui/new-ui.generated-ts/lib/) which is installed via `workspace:1.0.0` in [`new-ui`](./ui/new-ui/package.json)
1. In new-ui, we get an error where `@sj-test/server-api` can't import it's own stuff
    - seems past the symlink, all paths are confused by the `/lib/`, even though the package.json there is at the root of /lib/. Maybe because the tsconfigs are not?
    - all imported types are silently ignored as `unknown`. Inheritance breaks.
    - errors like `Object literal may only specify known properties, and 'by' does not exist in type 'IIncrementArg'.` [here](./ui/new-ui/src/App.tsx)
1. Setting `"presrveSymlinks": true` resolves the above errors, but
    - then we get errors in other places, like
    ```bash
    ERROR in src/App.test.tsx:2:18
        TS2305: Module '"@testing-library/react"' has no exported member 'screen'.
            1 | import React from 'react';
        > 2 | import { render, screen } from '@testing-library/react';
            |                  ^^^^^^
            3 | import App from './App';
            4 |
            5 | test('renders learn react link', () => {
    ```
    - Why is the App build even type-checking tests?


### Webpack paths

Was expecting a "can't find ../../whatever" error importing the svg by URL into App.scss via sass variable without 
`resolve: { symlinks: true, ... }` in the webpack config,
but that is not reproducing here, so the webpack loader chain must be a bit different in our real repo.
(using LESS, and SVG Loader, so maybe the problem is with SVG Loader config?)

