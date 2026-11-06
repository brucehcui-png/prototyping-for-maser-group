import type { Metadata } from "next";
import { Agentation } from "agentation";
import "./globals.css";

export const metadata: Metadata = {
  title: "8-Bit Retro Arcade - NES Collection",
  description: "A collaborative retro NES gaming arcade experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      translate="no"
      suppressHydrationWarning
      className="notranslate h-full bg-neutral-950 text-neutral-100"
    >
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const origRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                  if (child.parentNode !== this) {
                    if (console && console.warn) {
                      console.warn('Handled removeChild: node is not a child of parent', child, this);
                    }
                    return child;
                  }
                  return origRemoveChild.call(this, child);
                };
                const origInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, refNode) {
                  if (refNode && refNode.parentNode !== this) {
                    if (console && console.warn) {
                      console.warn('Handled insertBefore: refNode is not a child of parent', refNode, this);
                    }
                    return origInsertBefore.call(this, newNode, null);
                  }
                  return origInsertBefore.call(this, newNode, refNode);
                };
              }
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="notranslate min-h-full flex flex-col font-pixel select-none antialiased"
      >
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
