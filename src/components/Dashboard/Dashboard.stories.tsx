import type { Meta, StoryObj } from '@storybook/react'
import { Dashboard } from '.'

const meta = {
  title: 'Components/Dashboard',
  component: Dashboard,
  tags: ['autodocs'],
} satisfies Meta<typeof Dashboard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
