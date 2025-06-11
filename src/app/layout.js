import './globals.css';

export const metadata = {
  title: 'Notes App',
  description: 'Simple notepad with theme switcher',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
