export type Result<T, E> = 
        Readonly<{success: true, value: T}> |
        Readonly<{success: false, error: E}>

