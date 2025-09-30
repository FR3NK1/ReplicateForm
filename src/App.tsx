import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import SeadreamForm from './SeadreamForm'

export default function App() {
  return (
    <MantineProvider>
      <SeadreamForm />
    </MantineProvider>
  )
}
