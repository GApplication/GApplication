interface APIResponse { Name: string }
interface SignResponse { Name: string }

const API_URL = 'https://google.com/';

const API = (URL: string, Method: 'GET' | 'POST', CallBack: APIResponse) =>
{
    const Request = new XMLHttpRequest();

    Request.responseType = 'json';
    Request.timeout = 10_000;

    Request.onloadend = () =>
    {
        if (Request.status === 200)
        {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const Response = Request.response ?? undefined;

            CallBack(Response as never);

            return;
        }

        CallBack();
    };

    Request.open(Method, `${ API_URL }${ URL }`);

    Request.send();
};


export default
{
    Sign: (AccessCode: string, CallBack: SignResponse) =>
    {
        API(`Account/Sign/${ AccessCode }`, 'POST', CallBack);
    }
};
