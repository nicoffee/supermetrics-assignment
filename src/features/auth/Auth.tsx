import { FormEvent, useState } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { loginThunk } from './authSlice'
import styles from './Auth.module.css'

export function Auth() {
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(loginThunk({ name, email }))
  }

  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className={styles.textbox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          id="name"
        />

        <label htmlFor="email">Email</label>
        <input
          className={styles.textbox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          required
        />

        <button className={styles.button}>Login</button>
      </form>
    </div>
  )
}
