export default interface IRequestManager<Request, Response> {
    get(url: string, data?: Request): Promise<Response | null> //nullじゃなくてエラーメッセージ等を返したほうが良いかもね
    post(url: string, data?: Request): Promise<Response | null>
    patch(url: string, data?: Request): Promise<Response | null>
}
