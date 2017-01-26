#Start up, config the environment:#
1. brew update && brew doctor
2. brew install watchman
3. brew install android-sdk
4. vi ~/.bash_profile -> add: export ANDROID_HOME=/usr/local/opt/android-sdk
5. android (running)
6. install android plugin/ brew info android
7. cd /usr/local/Cellar/android-sdk/24.x.x
8. ls
9. cd extras
10. cd intel
11. ls
12. open ./
13. find the IntelHAXM_1.x.x.dmg
14. android avd //open android Virtual Devices
15. create -> start

#Develop#
1. cd ~/desktop
2. react-native init MovieTalk
3. ls
4. atom MovieTalk

#Open project in Virtual Machine#
1. for IOS:
  a. find the /ios/xxx.xcodeproj
  b. open in xCode, then run it
2. for android:
  a. android avd -> Start
  b. emulator @xxx
  c. cd ~/desktop/MovieTalk
  d. react-native run-android

#ECMAScript 5 => ECMAScript 6#
1. add .babelrc
inside of the .babelrc:
from React Native:
{
  "presets": ["react-native"]
}
then restart the package: npm start / react start
