import React from 'react'
import styles from './Button.module.css'

interface Props extends React.ComponentProps<'button'> {
  children: string
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...rest }, ref) => {
    return (
      <button ref={ref} {...rest} className={styles.button}>
        {children}
      </button>
    )
  },
)
