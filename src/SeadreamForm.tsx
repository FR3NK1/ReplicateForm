import {
  Button,
  Card,
  Checkbox,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { isNumber } from 'lodash'

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string
        ready: () => void
        sendData: (data: string) => void
        close: () => void
        // add other methods/properties if you use them:
        // onEvent?: (event: string, cb: (...args:any[]) => void) => void;
        // offEvent?: (event: string, cb: (...args:any[]) => void) => void;
        // expand?: () => void;
        // colorScheme?: 'light' | 'dark';
      }
    }
  }
}

const SeadreamForm = () => {
  const form = useForm({
    initialValues: {
      prompt: '',
      image_input: false,
      size: '2K',
      aspect_ratio: 'match_input_image',
      width: 2048,
      height: 2048,
    },
    validate: {
      prompt: isNotEmpty('Введите промпт'),
      width: (value, values) =>
        !isNumber(value) && values.size === 'custom' ? 'Введите ширину' : null,
      height: (value, values) =>
        !isNumber(value) && values.size === 'custom' ? 'Введите ширину' : null,
    },
  })

  const sendData = (data: any) => {
    const tg = window.Telegram!.WebApp
    tg.ready()

    tg.sendData(JSON.stringify(data))
    tg.close()
  }

  return (
    <form onSubmit={form.onSubmit((values) => sendData(values))} style={{ padding: '25px' }}>
      <Stack>
        <Textarea
          withAsterisk
          label='prompt'
          placeholder='a photo of a store front called "Seedream 4", it sells books, a poster in the window says "Seedream 4 now on Replicate"'
          key={form.key('prompt')}
          {...form.getInputProps('prompt')}
        />
        <Checkbox
          label='Добавить изображения (1-10 штук)'
          key={form.key('image_input')}
          {...form.getInputProps('image_input')}
        />
        <Select
          withAsterisk
          label='size'
          data={['1K', '2K', '4K', 'custom']}
          key={form.key('size')}
          {...form.getInputProps('size')}
        />
        <Select
          withAsterisk={!(form.values.size === 'custom')}
          label='aspect_ratio'
          data={['match_input_image', '1:1', '4:3', '3:4', '16:9', '9:16', '3:2', '2:3', '21:9']}
          disabled={form.values.size === 'custom'}
          key={form.key('aspect_ratio')}
          {...form.getInputProps('aspect_ratio')}
        />
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Stack>
            <Text fw={500}>Если выбран size "Custom"</Text>
            <Group grow>
              <NumberInput
                withAsterisk={form.values.size === 'custom'}
                label='width'
                min={1024}
                max={4096}
                disabled={!(form.values.size === 'custom')}
                key={form.key('width')}
                {...form.getInputProps('width')}
              />
              <NumberInput
                withAsterisk={form.values.size === 'custom'}
                label='height'
                min={1024}
                max={4096}
                disabled={!(form.values.size === 'custom')}
                key={form.key('height')}
                {...form.getInputProps('height')}
              />
            </Group>
          </Stack>
        </Card>
      </Stack>
      <Group justify='flex-end' mt='md'>
        <Button type='submit'>Отправить</Button>
      </Group>
    </form>
  )
}

export default SeadreamForm
