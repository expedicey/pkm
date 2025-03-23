import { LoginForm } from "@/components/login-form"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* Background gradient elements for depth */}
      <div className="fixed -top-40 -right-40 h-96 w-96 rounded-full bg-purple-700 dark:opacity-20 opacity-10 blur-3xl"></div>
      <div className="fixed -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-700 dark:opacity-20 opacity-10 blur-3xl"></div>
      
      <div className="w-full max-w-md p-8 glass-panel">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Franchise Ordering System</h1>
        <LoginForm />
      </div>
    </div>
  )
}

