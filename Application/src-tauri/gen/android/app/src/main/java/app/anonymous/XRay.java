package app.anonymous;

import android.content.Context;
import android.util.Log;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;

public class XRay
{
    private volatile static boolean IsRunning;
    private volatile static Process ProcessXRay;

    public static void Start(Context context, String Config)
    {
        new Thread(() ->
        {
            try
            {
                BufferedWriter ConfigBufferWriter = new BufferedWriter(new FileWriter(new File(context.getCacheDir(), "config.json")));
                ConfigBufferWriter.write(Config);
                ConfigBufferWriter.close();

                final String Executable = "libxray.so";

                // noinspection all
                new File(context.getApplicationInfo().nativeLibraryDir, Executable).setExecutable(true, true);

                ProcessXRay = Runtime.getRuntime().exec(context.getApplicationInfo().nativeLibraryDir + "/" + Executable + " run -c " + new File(context.getCacheDir(), "config.json").getAbsolutePath());

                BufferedReader BufferedReaderCore = new BufferedReader(new InputStreamReader(ProcessXRay.getInputStream()));

                IsRunning = true;

                while (IsRunning)
                {
                    final String Line = BufferedReaderCore.readLine();

                    if (Line == null)
                    {
                        IsRunning = false;

                        break;
                    }

                    Log.e("XRay", Line);
                }

                BufferedReaderCore.close();
            }
            catch (Exception e)
            {
                // Log.e("Android/Core/Error", e.getMessage() + " - " + Log.getStackTraceString(e));
            }

            Stop();
        }).start();
    }

    public static boolean IsRunning()
    {
        return IsRunning;
    }

    public static void Stop()
    {
        new Thread(() ->
        {
            IsRunning = false;

            if (ProcessXRay == null)
            {
                return;
            }

            try
            {
                Thread.sleep(200);
            }
            catch (Exception e)
            {
                //
            }

            try
            {
                ProcessXRay.getOutputStream().close();
            }
            catch (Exception e)
            {
                //
            }

            try
            {
                ProcessXRay.getInputStream().close();
            }
            catch (Exception e)
            {
                //
            }

            ProcessXRay = null;
        }).start();
    }
}
