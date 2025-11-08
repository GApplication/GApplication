import Config from './config';

const API = (URL: string, Method: 'GET' | 'POST', Body: string | undefined, CallBack: APIResponse) =>
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

            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            CallBack(Response as never);

            return;
        }

        CallBack();
    };

    Request.open(Method, `${ Config.App.API }${ URL }`);

    if (Body === undefined)
    {
        Request.send();

        return;
    }

    Request.setRequestHeader('Content-Type', 'application/json');

    Request.send(Body);
};

export default
{
    Install: (Agent: string, CallBack: InstallResponse) =>
    {
        API('client/new', 'POST', Agent, CallBack);
    },
    Invite: (InviteCode: string, CallBack: InviteResponse) =>
    {
        API('client/invite', 'POST', JSON.stringify({ invitation: InviteCode }), CallBack);
    }
};
