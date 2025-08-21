export type Result<T, E> = 
        Readonly<{success: true, value: T}> |
        Readonly<{success: false, error: E}>



export class ResultMapper<T, E>{
    private constructor(private result: Result<T, E>){}

    static from<T, E>(result: Result<T, E>) {return new ResultMapper(result)}

    public match<R>(onSuccess: (val: T) => R, onFailure: (err: E) => R){
        return this.result.success ? onSuccess(this.result.value) : onFailure(this.result.error)
    }

    public bind<R>(fun: (val: T) => Result<R, E>){
        return this.result.success 
                ? new ResultMapper<R, E>(fun(this.result.value)) 
                : new ResultMapper<R, E>(this.result)
    }

    public map<R>(m: (val: T)=> R){
        return this.result.success 
                ? new ResultMapper<R, E>({success: true, value: m(this.result.value)})
                : new ResultMapper<R, E>(this.result) 
    }

    public async matchAsync<R>(onSuccess: (val: T) => Promise<R>, onFailure: (err: E) => Promise<R>){
        return this.result.success ? await onSuccess(this.result.value) : await onFailure(this.result.error)
    }

    public async bindAsync<R>(fun: (val: T) => Promise<Result<R, E>>){
        return this.result.success 
                ? new ResultMapper<R, E>(await fun(this.result.value)) 
                : new ResultMapper<R, E>(this.result)
    }

    public async mapAsync<R>(m: (val: T)=> Promise<R>){
        return this.result.success 
                ? new ResultMapper<R, E>({success: true, value: await m(this.result.value)})
                : new ResultMapper<R, E>(this.result) 
    }
}