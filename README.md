# Feedr Technical Challenge

Thank you for taking the time to attempt this challenge.

These tests are used to evaluate candidates of all skill levels so please complete them to a level you feel is an accurate representation of your skill set.

Please read `README-FRONTEND.md` for further instructions.

If you have any questions or would like to clarify any details, please email lyz@feedr.co.

Good luck!

# Quick Start

Fork the repository, clone it to your local system, then:

## Install dependencies

yarn (or npm install)

## Start development server

yarn dev (or npm run dev)

## Run tests

yarn test (or npm run test)

# Developer Notes

- Node version - v12.17.0
- Time - 3 hrs

* The `<Menu>` component acts similar to a container, and manages data fetching a state and renders the presentational components for the page.
* I decided to use hooks to manage state and not a global state management library (e.g. Redux), as I wanted to keep it simple as it's a small app and I didn't want to introduce large dependencies at an early stage.
* Similarly I just used my own `useFetchMenu` hook for simplicity, however, it may be beneficial to use a library e.g. react query (or Redux) to manage this in the future. Also, at the moment there's no error handling, which would need adding.
* The filter by name functionality isn't 100% complete, I've just filtered this in the `useFetchMenu` hook. This isn't the correct place for this but I ran out of time, ideally this would be happen on the server.
* I didn't focus much on styling, so I've just used the default styling which came with the challenge but split up the CSS and aligned it with the correct component.
* From a testing perspective I've used react testing library to test the `<Menu>` component, mocking the server to return consistent results. I haven't tested the underlying presentational components as they are tested at the top level. However, if these components were to be used outside of this context e.g. in a component library for example it would be beneficial to add unit tests to these components.
* Perfomance - Made some assumptions the list of items returned from the API would be quite small, however, if the lists ended up being larger we could remap the data so it's easier and faster to do lookups
