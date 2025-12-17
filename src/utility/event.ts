/**
 * Event - Internal map storing event listeners keyed by event name
 * @type {Map<keyof EventMap, EventCall<keyof EventMap>[]>}
 */
const Event = new Map<keyof EventMap, EventCall<keyof EventMap>[]>();

/**
 * On - Registers an event listener for the specified event name
 * @template T
 * @param {T} Name - The event name to listen for
 * @param {EventCall<T>} Call - The callback invoked when the event is emitted
 */
const On = <T extends keyof EventMap>(Name: T, Call: EventCall<T>) =>
{
    const M = Event.get(Name) ?? [];

    M.push(Call);

    Event.set(Name, M);
};

/**
 * Emit - Emits an event and invokes all registered listeners with provided arguments
 * @template T
 * @param {T} Name - The event name to emit
 * @param {...EventMap[T]} Args - Arguments forwarded to each listener
 */
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

/**
 * Off - Removes a previously registered listener for an event
 * @template T
 * @param {T} Name - The event name
 * @param {EventCall<T>} Call - The listener to remove
 */
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
