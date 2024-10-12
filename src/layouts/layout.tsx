import { Button } from "@/components/ui/button"
import { FC } from "react"

type LayoutProps = {
  children: React.ReactNode
  title: string
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
  const isLoggedIn = localStorage.getItem('loggedIn');

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="grid justify-items-center pt-24 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-start">
        <h1 className="self-center text-xl font-bold">{title}</h1>
        {children}
      </main>
      {isLoggedIn && <Button variant='outline' className="absolute right-10 top-10" onClick={handleLogOut}>
        Log Out
      </Button>}
    </div>
  )
}

export default Layout