# Christmas Glow — corner-view edition

## Publish from iPhone
Extract this ZIP in Files. Upload index.html, the index-*.js and index-*.css files, and house-wireframe.svg to the root of your GitHub repository. Settings → Pages → Deploy from a branch → main → /(root). No build step or server is required. The editable-source.zip is optional and need not be uploaded.

## Controls
Modern large icon buttons in Christmas red, evergreen, cream and gold. Tree-free corner-view wireframe, based on your house photo; obscured architectural details are approximate. The strand has exactly 100 bulbs, with 1 at the far right and 100 at the far left. Adjust roofline anchors in Layout. HEX accepts all six-digit RGB colors; the full color picker remains unrestricted. Warm whites have a 1000–4000K approximate RGB range and quick 1800/2200/2700/3000/4000K choices. This is a screen approximation, not calibrated LED color temperature.

## Music and recurring shows
Music lets you select any file type. The browser must be able to decode its audio; selecting a file does not guarantee format support. MP3, WAV and common M4A files are sensible choices. Unsupported formats show an error. Limits: 60MB and 15 minutes. Rhythm analysis and playback happen locally; no microphone is involved.

Choose a song, movement, accents, starting bulb and center. In Timers, select Music show, a time and Every day / Weekdays / Weekends, then Save schedule. The schedule remembers the filename. Keep that song loaded, then tap Enable schedules. The song restarts from the beginning at the scheduled local time and the preview follows its analyzed beats. If several schedules share a minute, the last one takes precedence. Music schedules use the currently selected movement and layout. Schedule names and settings persist locally; audio and the enabled state do not persist across reloads. Rechoose the matching song and enable schedules after reopening.

Keep the tab visible and the iPhone awake. Background, locked-screen and closed-page schedules are not reliable. Audio autoplay permission may require another tap. These recurring schedules run the SCREEN PREVIEW, not the physical lights.

## Hardware status
Connect contains the recovered Hello Fairy Bluetooth identification, power and whole-strand HSV test commands. Valid identification enables manual commands. Actual hardware compatibility still requires testing on your strand. Bluetooth on iPhone needs a compatible browser or Safari extension; see Connect for links. The other controls edit the preview. Wi-Fi, per-bulb writes, live music transmission, device timers and Shortcuts commands are not implemented. Hosting on Pages does not add those capabilities.

## Privacy
Your original photos and APK are not included. The wireframe contains only an approximate house outline. Audio stays in the browser. The site makes no analytics or cloud AI calls. Save settings makes a portable JSON backup. A public Pages site is public; noindex is a request, not access control. Do not upload personal data or logs.

## Editable source
Unzip editable-source.zip separately. Install dependencies with npm install, then npm run build (Node compatible with Vite 8). dist is the resulting site; preserve its assets folder when uploading. This packaged release flattens those assets for easy iPhone upload. The package includes audio-analysis, BLE mock, and schedule tests. Run each *.test.mjs using node --experimental-strip-types. Hardware and real iPhone background behavior have not been validated.
