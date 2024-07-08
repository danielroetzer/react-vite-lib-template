import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from './index.tsx'

describe('Input', () => {
  it('should render', () => {
    render(<Input label="Input" data-testid="input" />)
  })

  it('should be disabled', () => {
    render(<Input disabled label="Input disabled" data-testid="input" />)

    expect(screen.getByTestId('input')).toBeDisabled()
  })
})
