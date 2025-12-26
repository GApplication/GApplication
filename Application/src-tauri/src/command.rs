use crate::tun;

#[tauri::command]
pub async fn tun_start(config: String) -> Result<(), String>
{
    Ok(())
}

#[tauri::command]
pub async fn tun_stop() -> Result<(), String>
{
    tun::socks_stop().expect("Failed to tun_stop");

    Ok(())
}
