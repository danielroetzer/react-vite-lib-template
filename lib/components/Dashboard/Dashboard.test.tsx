import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Dashboard } from '.'

describe('Dashboard', () => {
  it('should render text Dashboard', () => {
    render(<Dashboard />)
    screen.getByText('Dashboard')
  })
})
