import { Inter } from 'next/font/google'
import './globals.css'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import ActiveStatus from './components/ActiveStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messanger',
  description: 'Messanger clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthContext>
        <ToasterContext/>
        <ActiveStatus/>
        {children}
      </AuthContext>
      </body>
    </html>
  )
}
