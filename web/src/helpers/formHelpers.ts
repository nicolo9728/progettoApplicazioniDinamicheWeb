import { FormEvent } from "react"

export const extractObjectFromForm = <T>(form: HTMLFormElement) =>
    Object.fromEntries((new FormData(form)).entries()) as T


export const formSubmit = <T>(fun: (form: T)=>void) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fun(extractObjectFromForm(e.currentTarget))
} 