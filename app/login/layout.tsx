import { ProtectedLayout } from '@/app/components'

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <ProtectedLayout>
      {children}
    </ProtectedLayout>
  )
}
