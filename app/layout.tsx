import React from 'react';
import './globals.css';

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
      <body className="bg-[#020617]">{children}</body>
    </html>
  );
}
