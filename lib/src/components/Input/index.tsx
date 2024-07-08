import React from 'react'
import styles from './Input.module.css'

interface Props extends React.ComponentProps<'input'> {
  label: string
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, ...rest }, ref) => {
    return (
      <label>
        {label}&nbsp;
        <input ref={ref} {...rest} className={styles.input} />
      </label>
    )
  },
)
