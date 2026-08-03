/* The (launch) OG card, re-exported so /manifesto gets one too — a child route
   that declares its own `openGraph` does not inherit the parent segment's
   generated image. */
export { alt, size, contentType, default } from "../opengraph-image"
