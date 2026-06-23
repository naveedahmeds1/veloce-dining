import React from 'react';

export const metadata = {
  title: 'Veloce Dining Systems',
  description: 'Enterprise routing framework for live restaurant operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CDN Script for 100% successful build */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-[#020617] text-white font-sans">{children}</body>
    </html>
  );
}
