import Storage from './storage';

const IsLogged = () =>
{
    return false;
};

const IsNewInstall = () =>
{
    return Storage.GetValue('APP.INSTALL') === null;
};

const SetInstallTime = () =>
{
    Storage.SetValue('APP.INSTALL', `${ Date.now() / 1000 }`);
};

export default { IsLogged, IsNewInstall, SetInstallTime };
