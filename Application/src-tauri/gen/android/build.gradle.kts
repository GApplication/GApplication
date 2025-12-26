buildscript {
    repositories {
        maven{ url = uri("https://maven.myket.ir") }
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.android.tools.build:gradle:8.13.2")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.25")
    }
}

allprojects {
    repositories {
        maven{ url = uri("https://maven.myket.ir") }
        google()
        mavenCentral()
    }
}

tasks.register("clean").configure {
    delete("build")
}
