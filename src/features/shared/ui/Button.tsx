import { ReactNode } from 'react'
import styles from './Button.module.css'

type Props = {
  children: ReactNode
}

export const Button = (props: Props) => (
  <button className={styles.button}>{props.children}</button>
)
