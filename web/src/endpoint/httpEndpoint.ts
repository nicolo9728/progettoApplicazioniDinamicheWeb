import { injectable } from "tsyringe"
import type { Result } from "../../../common/Result"

export type ErrorMessage = Readonly<
    {
        message: string
    }
>

export type ResponseType = Readonly<
    {
        errors: ErrorMessage[] | undefined,
        data: any
    }>

@injectable()
export class HttpEndpoint {

    private HOST = "http://localhost:5000/"

    public async query(url: string, query: string): Promise<Result<any, ErrorMessage[]>> {
        const ris = await (await fetch(`${this.HOST}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem("token") ?? ""
            },
            body: JSON.stringify({ query })
        })).json() as ResponseType


        return ris.errors && ris.errors.length > 0
            ? { success: false, error: ris.errors as ErrorMessage[] }
            : { success: true, value: ris.data }
    }
}
