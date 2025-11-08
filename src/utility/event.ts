const Event = new Map<keyof EventMap, EventCall<keyof EventMap>[]>();

const On = <T extends keyof EventMap>(Name: T, Call: EventCall<T>) =>
{
    const M = Event.get(Name) ?? [];

    M.push(Call);

    Event.set(Name, M);
};

const Emit = <T extends keyof EventMap>(Name: T, ...Args: EventMap[T]) =>
{
    const M = Event.get(Name);

    if (M === undefined)
    {
        return;
    }

    for (const Call of M)
    {
        Call(...Args);
    }
};

const Off = <T extends keyof EventMap>(Name: T, Call: EventCall<T>) =>
{
    const M = Event.get(Name);

    if (M === undefined)
    {
        return;
    }

    Event.set(Name, M.filter((fn) => fn !== Call));
};

export default { On, Emit, Off };
