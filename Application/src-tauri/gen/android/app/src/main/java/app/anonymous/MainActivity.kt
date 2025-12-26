package app.anonymous

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.net.VpnService
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.core.graphics.createBitmap
import androidx.core.graphics.toColorInt
import androidx.core.net.toUri
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import hev.sockstun.TProxyService
import java.io.File
import java.io.FileOutputStream


class MainActivity : TauriActivity() {
    var resultLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { _ ->
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()

        super.onCreate(savedInstanceState)

        if (Build.VERSION.SDK_INT < 30) {
            WindowCompat.setDecorFitsSystemWindows(window, true)

            @Suppress("DEPRECATION")
            window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
        } else {
            WindowCompat.setDecorFitsSystemWindows(window, false)

            val rootView = findViewById<View>(android.R.id.content)

            ViewCompat.setOnApplyWindowInsetsListener(rootView) { view, insets ->
                val imeInsets = insets.getInsets(WindowInsetsCompat.Type.ime())
                val navInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars())

                view.setPadding(view.paddingLeft, view.paddingTop, view.paddingRight, if (imeInsets.bottom > navInsets.bottom) imeInsets.bottom else navInsets.bottom)

                insets
            }
        }
    }

    override fun onWebViewCreate(webView: WebView) {
        super.onWebViewCreate(webView)

        webView.addJavascriptInterface(object : Any() {
            @JavascriptInterface
            @Suppress("UNUSED")
            fun Action(message: String?) {
                if (message == null) {
                    return
                }

                if (message.startsWith("MESSAGE_VPN_START")) {
                    val packageMap = message.split("::::")[1]
                    val configMap = message.split("::::")[2]
                    val port = message.split("::::")[3]

                    val intent = Intent(this@MainActivity, TProxyService::class.java)

                    intent.putExtra("Package", packageMap)
                    intent.putExtra("Config", configMap)
                    intent.putExtra("Port", port)
                    intent.setAction("START")

                    if (Build.VERSION.SDK_INT > 25) {
                        startForegroundService(intent)
                    } else {
                        startService(intent)
                    }

                    return
                }

                if (message.startsWith("MESSAGE_VPN_AVAILABLE")) {
                    if (Build.VERSION.SDK_INT > 32) {
                        if (ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                            this@MainActivity.requestPermissions(arrayOf<String?>(Manifest.permission.POST_NOTIFICATIONS), 100)

                            return
                        }
                    }

                    val intent = VpnService.prepare(this@MainActivity)

                    if (intent != null) {
                        resultLauncher.launch(intent)

                        return
                    }

                    runOnUiThread {
                        val code = "document.dispatchEvent(new CustomEvent('VPN', { detail: { status: 'available' } }));"

                        webView.evaluateJavascript(code, null)
                    }

                    return
                }

                if (message.startsWith("MESSAGE_VPN_STATUS")) {
                    var status = "stopped"

                    if (TProxyService.IsRunning.get()) {
                        status = "running"
                    }

                    runOnUiThread {
                        val code = "document.dispatchEvent(new CustomEvent('VPN', { detail: { status: '$status' } }));"

                        webView.evaluateJavascript(code, null)
                    }

                    return
                }

                if (message.startsWith("MESSAGE_VPN_STOP")) {
                    val intent = Intent(this@MainActivity, TProxyService::class.java)

                    intent.setAction("STOP")

                    startService(intent)

                    return
                }

                if (message.startsWith("MESSAGE_XRAY_START")) {
                    val config = message.split("::::")[1]

                    XRay.Start(this@MainActivity, config)

                    return
                }

                if (message.startsWith("MESSAGE_XRAY_RUNNING")) {

                    val isRunning = XRay.IsRunning()

                    runOnUiThread {
                        val code = "document.dispatchEvent(new CustomEvent('XRay', { detail: { isRunning: '$isRunning' } }));"

                        webView.evaluateJavascript(code, null)
                    }

                    return
                }

                if (message.startsWith("MESSAGE_XRAY_STOP")) {
                    XRay.Stop()

                    return
                }

                if (message.startsWith("MESSAGE_OPEN_TELEGRAM")) {
                    val url = message.split("::::")[1]
                    val link = message.split("::::")[2]

                    try {
                        val intent = Intent(Intent.ACTION_SEND)
                        intent.setPackage("org.telegram.messenger")
                        intent.setData(link.toUri())

                        startActivity(intent)
                    } catch (_: Exception) {
                        try {
                            startActivity(Intent(Intent.ACTION_VIEW, url.toUri()))
                        } catch (_: Exception) {
                            //
                        }
                    }

                    return
                }

                if (message.startsWith("MESSAGE_OPEN_INSTAGRAM")) {
                    val url = message.split("::::")[1]

                    try {
                        val intent = Intent(Intent.ACTION_SEND)
                        intent.setPackage("com.instagram.android")
                        intent.setData(url.toUri())

                        startActivity(intent)
                    } catch (_: Exception) {
                        try {
                            startActivity(Intent(Intent.ACTION_VIEW, url.toUri()))
                        } catch (_: Exception) {
                            //
                        }
                    }

                    return
                }

                if (message.startsWith("MESSAGE_OPEN_WEBSITE")) {
                    val url = message.split("::::")[1]

                    try {
                        startActivity(Intent(Intent.ACTION_VIEW, url.toUri()))
                    } catch (_: Exception) {
                        //
                    }

                    return
                }

                if (message.startsWith("MESSAGE_INSTALLED_PACKAGE")) {
                    Thread {
                        val resolveInfoMap = if (Build.VERSION.SDK_INT > 32) {
                            packageManager.queryIntentActivities(
                                Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER), PackageManager.ResolveInfoFlags.of(PackageManager.GET_META_DATA.toLong())
                            )
                        } else {
                            packageManager.queryIntentActivities(Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER), PackageManager.GET_META_DATA)
                        }

                        for (info in resolveInfoMap) {
                            val name = info.activityInfo.applicationInfo.loadLabel(packageManager).toString()
                            val icon = info.activityInfo.applicationInfo.loadIcon(packageManager)
                            val packageName = info.activityInfo.applicationInfo.packageName

                            val savedFile = saveDrawableToFile(drawable = icon, fileName = "$packageName.png")

                            runOnUiThread {
                                val code = "document.dispatchEvent(new CustomEvent('Package', { detail: { name: '$name', packageName: '$packageName', path: '${savedFile.absolutePath}' } }));"

                                webView.evaluateJavascript(code, null)
                            }
                        }
                    }.start()

                    return
                }

                if (message.startsWith("MESSAGE_SET_SYSTEM_BAR_COLOR")) {
                    val color = message.split("::::")[1].toColorInt()

                    runOnUiThread {
                        if (Build.VERSION.SDK_INT >= 35) {
                            WindowCompat.setDecorFitsSystemWindows(window, false)

                            window.decorView.setOnApplyWindowInsetsListener { view, insets ->
                                val bars = insets.getInsets(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())

                                view.setPadding(0, bars.top, 0, bars.bottom)
                                view.setBackgroundColor(color)

                                insets
                            }
                        } else {
                            @Suppress("DEPRECATION")
                            window.statusBarColor = color
                            @Suppress("DEPRECATION")
                            window.navigationBarColor = color
                        }
                    }

                    return
                }
            }
        }, "AndroidBridge")
    }

    fun drawableToBitmap(drawable: Drawable): Bitmap {
        return when (drawable) {
            is BitmapDrawable -> drawable.bitmap
            else -> {
                val width = if (drawable.intrinsicWidth > 0) drawable.intrinsicWidth else 1
                val height = if (drawable.intrinsicHeight > 0) drawable.intrinsicHeight else 1
                val bitmap = createBitmap(width, height)
                val canvas = Canvas(bitmap)
                drawable.setBounds(0, 0, canvas.width, canvas.height)
                drawable.draw(canvas)
                bitmap
            }
        }
    }

    fun saveDrawableToFile(drawable: Drawable, fileName: String): File {
        val bitmap = drawableToBitmap(drawable)

        val file = File(filesDir, fileName)

        FileOutputStream(file).use { outputStream ->
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)

            bitmap.recycle()
        }

        return file
    }
}
