pub fn tun2socks_start(config: String) -> Result<(), String>
{
    #[cfg(desktop)]
    {
        use std::fs;
        use std::ffi::OsStr;
        use std::os::windows::ffi::OsStrExt;

        use windows_sys::Win32::UI;

        let app_path = std::env::current_exe().map_err(|e| format!("Failed to get application path: {}", e))?;

        let app_dir = app_path.parent().ok_or("Failed to get application directory")?;

        let app_config = app_dir.join("bin").join("config.yml");

        let app_tun2socks = app_dir.join("bin").join("tun2socks.exe");

        fs::write(&app_config, config).map_err(|e| format!("Failed to write config.yml: {}", e))?;

        let args = format!("\"{}\"", app_config.display());

        let verb: Vec<u16> = OsStr::new("runas").encode_wide().chain(Some(0)).collect();
        let exe: Vec<u16> = app_tun2socks.as_os_str().encode_wide().chain(Some(0)).collect();
        let args: Vec<u16> = OsStr::new(&args).encode_wide().chain(Some(0)).collect();

        let result = unsafe { UI::Shell::ShellExecuteW(std::ptr::null_mut(), verb.as_ptr(), exe.as_ptr(), args.as_ptr(), std::ptr::null(), UI::WindowsAndMessaging::SW_HIDE) };

        if result as isize <= 32
        {
            return Err("Failed to start tun2socks".into());
        }
    }

    Ok(())
}

pub fn socks_stop() -> Result<(), String>
{
    #[cfg(desktop)]
    {
        use std::ffi::OsStr;
        use std::os::windows::ffi::OsStrExt;

        use windows_sys::Win32::UI;

        let exe = OsStr::new("taskkill.exe").encode_wide().chain(Some(0)).collect::<Vec<u16>>();

        let args = OsStr::new("/IM tun2socks.exe /F").encode_wide().chain(Some(0)).collect::<Vec<u16>>();

        let verb = OsStr::new("runas").encode_wide().chain(Some(0)).collect::<Vec<u16>>();

        let result = unsafe { UI::Shell::ShellExecuteW(std::ptr::null_mut(), verb.as_ptr(), exe.as_ptr(), args.as_ptr(), std::ptr::null(), UI::WindowsAndMessaging::SW_HIDE) };

        if result as isize <= 32
        {
            return Err("Failed to run taskkill as admin".into());
        }
    }

    Ok(())
}
