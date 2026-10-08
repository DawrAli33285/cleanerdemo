# Client demo mode

## Start the frontend

Run from this folder:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The frontend runs without a backend.

## Demo sign-ins

- Partner: `partner@sample.test` / `demo1234`
- Admin: use the admin account configured in `src/demo/mockApi.js`

## Data and network behavior

- All API calls are intercepted by the local Axios adapter and answered with fictional sample data.
- The demo does not call a backend, database, email service, Airtable, or file storage.
- File selections are discarded; no file contents are uploaded or retained.
- The admin sign-in is only a client-side demo gate. Its credential is included in browser code and is not secure; never reuse that password or connect this demo to real data.
- Changes reset when the page is refreshed. Demo sign-in persists across page navigation.
- A Content Security Policy blocks external scripts, connections, images, and fonts.
- Do not start or connect the original backend for this demo; it is not needed.
