import { ComponentProps } from 'react'
import styles from './Input.module.css'

type Props = {
  value: ComponentProps<'input'>['value']
  onChange: ComponentProps<'input'>['onChange']
  label?: string
  classNames?: string
  id?: ComponentProps<'input'>['name']
  type?: ComponentProps<'input'>['type']
  required?: ComponentProps<'input'>['required']
  size?: 'small' | 'regular'
}

export const Input = ({
  value,
  onChange,
  label,
  classNames = '',
  id = '',
  type = 'text',
  required,
  size = 'regular',
}: Props) => (
  <div className={`${styles.inputContainer} ${classNames}`}>
    {label && <label htmlFor={id}>{label}</label>}
    <input
      className={`${styles.input} ${size === 'small' && styles.small}`}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
)
