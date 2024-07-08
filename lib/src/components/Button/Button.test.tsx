import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './index.tsx'

describe('Button', () => {
  it('should render children', () => {
    const buttonText = 'Button'

    render(<Button data-testid="btn">{buttonText}</Button>)

    expect(screen.getByTestId('btn')).toHaveTextContent(buttonText)
  })

  it('should be disabled', () => {
    render(
      <Button disabled data-testid="btn">
        Button disabled
      </Button>,
    )

    expect(screen.getByTestId('btn')).toBeDisabled()
  })

  it('should trigger onClick', () => {
    const onClick = vi.fn()

    render(
      <Button onClick={onClick} data-testid="btn">
        Click me
      </Button>,
    )

    expect(onClick).toHaveBeenCalledTimes(0)

    fireEvent.click(screen.getByTestId('btn'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
