import { useState } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Vite + React
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-600 dark:text-gray-300">
          Edit{" "}
          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            src/App.tsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>
      <p className="text-gray-500 dark:text-gray-400 mt-8 text-center max-w-md">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
