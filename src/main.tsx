import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/ui/ErrorFallback'
import App from '@/App'
import '@/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
	throw new Error('Root element not found')
}

const root = createRoot(rootElement)

root.render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
			<App />
		</ErrorBoundary>
	</StrictMode>
)
