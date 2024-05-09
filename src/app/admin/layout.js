export const metadata = {
    title: 'Backend | Space Between People',
    description: 'Welcome to the Backend of Space Between People',
  }
  
  export default function RootLayout({
    children}) {
   return (
      <html>
        <body>{children}</body>
      </html>
    )
  }
  