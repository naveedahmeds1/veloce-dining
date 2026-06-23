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
      <body>{children}</body>
    </html>
  );
}
