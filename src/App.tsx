import { useState } from "react"
import "./App.css"

function App() {
  const [theme, setTheme] = useState("paper")
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-['Montserrat'] ${
        theme === "paper"
          ? "bg-[#faf9f6] text-gray-800"
          : darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
          theme === "paper"
            ? "bg-[#faf9f6]/80 border-gray-200"
            : darkMode
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white/80 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-['Playfair_Display']">
                Component Library Showcase
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Paper-themed React components • 70+ components planned
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
              >
                <option value="paper">📄 Paper Theme</option>
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
              </select>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <h2 className="text-4xl font-bold font-['Playfair_Display'] mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Component library is currently in development. Check back soon for
              interactive component demos and documentation.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
