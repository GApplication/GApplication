package hev.sockstun;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.net.VpnService;
import android.os.Build;
import android.os.ParcelFileDescriptor;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.ServiceCompat;

import java.io.File;
import java.io.FileOutputStream;
import java.util.concurrent.atomic.AtomicBoolean;

import app.anonymous.R;

public class TProxyService extends VpnService
{
    public final static AtomicBoolean IsRunning = new AtomicBoolean(false);

    static
    {
        System.loadLibrary("hev-socks5-tunnel");
    }

    private ParcelFileDescriptor TunnelFileDescriptor = null;

    private static native long[] TProxyGetStats();
    private static native void TProxyStopService();
    private static native void TProxyStartService(String Config, int FileDescriptor);

    @Override
    public int onStartCommand(Intent intent, int Flags, int StartID)
    {
        String Action = intent.getAction();

        if (Action != null)
        {
            if (Action.equals("START"))
            {
                StartService(intent);
            }

            if (Action.equals("STOP"))
            {
                StopService();
            }
        }

        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy()
    {
        super.onDestroy();

        StopService();
    }

    @Override
    public void onRevoke()
    {
        super.onRevoke();

        StopService();
    }

    private void StartService(Intent intent)
    {
        try
        {
            if (TunnelFileDescriptor != null)
            {
                throw new Exception("StartService Error: 1");
            }

            final String Package = intent.getStringExtra("Package");
            final String Config = intent.getStringExtra("Config");
            final String Port = intent.getStringExtra("Port");

            if (Package == null || Config == null || Port == null)
            {
                throw new Exception("StartService Error: 2");
            }

            VpnService.Builder BuilderVPN = new VpnService.Builder();
            BuilderVPN.addDisallowedApplication(getApplicationContext().getPackageName());
            BuilderVPN.setSession(getString(R.string.AppName));
            BuilderVPN.addAddress("192.168.20.20", 32);
            BuilderVPN.addDnsServer("8.8.8.8");
            BuilderVPN.addRoute("0.0.0.0", 0);
            BuilderVPN.setBlocking(false);
            BuilderVPN.setMtu(8500);

            for (String PackageTemp : Package.split(","))
            {
                try
                {
                    BuilderVPN.addDisallowedApplication(PackageTemp);
                }
                catch (Exception e)
                {
                    //
                }
            }

            if (Build.VERSION.SDK_INT > 28)
            {
                BuilderVPN.setMetered(false);
            }

            TunnelFileDescriptor = BuilderVPN.establish();

            if (TunnelFileDescriptor == null)
            {
                throw new Exception("StartService Error: 3");
            }

            if (Build.VERSION.SDK_INT > 25)
            {
                NotificationManager NotificationManagerMain = getSystemService(NotificationManager.class);
                NotificationManagerMain.createNotificationChannel(new NotificationChannel(getString(R.string.AppName), getString(R.string.AppName), NotificationManager.IMPORTANCE_DEFAULT));
            }

            NotificationCompat.Builder NotificationBuilder = new NotificationCompat.Builder(this, getString(R.string.AppName));
            NotificationBuilder.setPriority(NotificationCompat.PRIORITY_HIGH);
            NotificationBuilder.setContentTitle(getString(R.string.AppName));

            if (Build.VERSION.SDK_INT > 33)
            {
                startForeground(100, NotificationBuilder.build(), ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
            }
            else
            {
                startForeground(100, NotificationBuilder.build());
            }

            IsRunning.set(true);

            File ConfigFile = new File(getCacheDir(), "HevConfig");

            // noinspection all
            ConfigFile.delete();
            // noinspection all
            ConfigFile.createNewFile();

            String ProxyConfig = "";

            ProxyConfig += "tunnel:\n";
            ProxyConfig += "  mtu: 8500\n";
            ProxyConfig += "  ipv4: 192.168.20.20\n";

            ProxyConfig += "socks5:\n";
            ProxyConfig += "  address: '127.0.0.1'\n";
            ProxyConfig += "  port: " + Port + "\n";
            ProxyConfig += "  udp: 'udp'\n";

            FileOutputStream FileOutputStreamMain = new FileOutputStream(ConfigFile, false);
            FileOutputStreamMain.write(ProxyConfig.getBytes());
            FileOutputStreamMain.close();

            TProxyService.TProxyStartService(ConfigFile.getAbsolutePath(), TunnelFileDescriptor.getFd());
        }
        catch (Exception e)
        {
            Log.e("VPNService", "Message: " + e.getMessage());
        }
    }

    private void StopService()
    {
        IsRunning.set(false);

        try
        {
            NotificationManager NotificationManagerMain = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            NotificationManagerMain.cancel(100);

            ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE);

            try
            {
                if (TunnelFileDescriptor != null)
                {
                    TunnelFileDescriptor.close();
                }
            }
            catch (Exception e)
            {
                //
            }

            TProxyService.TProxyStopService();

            stopSelf();
        }
        catch (Exception e)
        {
            //
        }
    }
}
