import { WagmiProvider } from 'wagmi'
import { config } from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoApp from './components/TodoApp'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/theme-toggle'
import { Route, Routes } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'
import Home from './components/Home'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ModeToggle/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/connect' element={<ConnectWallet/>}/>
              <Route path='/app' element={<TodoApp/>}/>
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}


export default App