import type { Meta, StoryObj } from '@storybook/vue3'

import BaseButton from '../components/Ui/BaseButton/index.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Base/Button',
  component: BaseButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'boarded', 'link'],
    },
    // backgroundColor: { control: 'color' },
    // onClick: { action: 'clicked' },
  },
  // args: { primary: false }, // default value
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    type: 'primary',
    default: 'Кнопка',
  },
}
export const Secondary: Story = {
  args: {
    type: 'secondary',
    default: '123',
  },
}
export const Boarded: Story = {
  args: {
    type: 'boarded',
    default: '123',
  },
}
export const Link: Story = {
  args: {
    type: 'link',
    default: '123',
  },
}
