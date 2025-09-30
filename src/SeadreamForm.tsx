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

  return (
    <form
      onSubmit={form.onSubmit((values) => alert(JSON.stringify(values)))}
      style={{ padding: '25px' }}
    >
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
