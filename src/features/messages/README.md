# Messaging center

The dashboard uses the shared authenticated Axios client and user-scoped React Query caches.

## Environment

Set these in `.env.local` and in your deployment environment:

- `NEXT_PUBLIC_BACKEND_BASE_URL`: REST base including `/api/v1`.
- `NEXT_PUBLIC_SOCKET_URL`: Socket.IO server origin, without `/api/v1`.

See the root `.env.example`. Restart the development server after changing these values.
Next.js embeds public environment values at build time, so set deployment values before building.

## Structure

- `api/`: HTTP requests and multipart uploads.
- `queries/`: per-user inbox and history cache keys.
- `hooks/`: queries, socket lifecycle, read synchronization, typing, composer and scrolling behavior.
- `helpers/`: message deduplication, cache updates, attachment validation and display mapping.
- `types/`: server contracts and UI models.
- `components/`: presentation; event handlers and business logic live in `.ts` hooks/helpers.

History uses the other participant's user ID, not the chat ID. Page 1 is newest;
older pages are merged by message ID in chronological order. Sending uses multipart
`content` and repeated `attachments` fields; Axios lets the browser set the boundary.

Read state is confirmed on the server when opening a conversation, receiving an
active message while visible, or returning to a visible browser tab. Socket reconnects
refetch the inbox and active history. HTTP/socket echoes are deduplicated by `_id`.

Image, file and audio attachments are supported. The shared composer includes
microphone recording with Stop, Cancel and audio preview before sending. Browser
microphone permission and a secure context (HTTPS or localhost) are required.

## Conversation modal

`MessageButton` opens the shared 80vh `MessageModal`. Pass a `MessageRecipient`
with a **user ID**, name and optional image to open an existing conversation or
start a new one. Omit the recipient to open the inbox. New conversations can be
sent without a chat ID; the API creates it. `MessageModalBody` mounts only while
open, so closing the modal stops its socket, typing timers and history subscription.

Incoming messages play a short chime automatically after normal browser interaction,
when Settings → Notifications → Allow new message notification is enabled.
There is no separate sound toggle or test chime in the inbox.
Own messages, history fetches and duplicate socket events do not play a sound.
Outgoing messages display immediately with a pending status while their HTTP upload
is confirmed; confirmed history updates in place without a full history refetch.
