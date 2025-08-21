import { injectable } from "tsyringe"
import type { Result } from "../../../common/Result"

type ErrorMessage = Readonly<
    {
        message: string
    }
>

type ResponseType = Readonly<
    {
        errors: ErrorMessage[],
        data: any
    }>

@injectable()
export class HttpEndpoint {

    private HOST = "http://localhost:5000/"

    public async query<T>(url: string, query: string): Promise<Result<T, ErrorMessage[]>> {
        const ris = await (await fetch(`${this.HOST}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query })
        })).json() as ResponseType


        return ris.errors.length > 0
            ? { success: false, error: ris.errors as ErrorMessage[]}
            : { success: true, value: ris.data as T }

    }
}
