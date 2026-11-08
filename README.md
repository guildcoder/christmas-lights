# Cross Lights

A Christmas light studio for a 100-bulb Hello Fairy strand. Cream paper, red lettering, fir green, a snowy house preview, and four simple destinations: Light Show, Color Wheel, Light Design, Connect.

## iPhone

Open the GitHub Pages site in **Bluefy**, then Connect and identify your strand. Once verified, color, HEX, warm-white presets, brightness, power and Play send automatically. There is no separate Send Color step. Bluetooth permission must be granted in that browser.

For a standalone studio, open the site in Safari → Share → Add to Home Screen. The app includes 180/192/512 pixel icons, a scoped manifest, safe-area layout and a versioned offline shell. Visit once online to cache it. Installing from Safari does not add Bluetooth support: use Bluefy for live control. Browser storage and audio are separate between Bluefy, Safari and Home Screen installs. Updates activate after all old app tabs close; they do not interrupt a running show.

## Shows

16 whole-strand effects work through the recovered color/brightness protocol. Play starts a built-in rhythm without a song; choose audio to follow analyzed onsets and coarse bass/mid/treble energy. This is not exact musical-note transcription. Audio stays on the device. The file chooser accepts any file, but decoding depends on the browser's codecs; 60 MB / 15 minute limits protect phone memory.

8 additional spatial previews include Notes apart, Piano keys, Comet trail, Center burst, Split harmony, Ribbon wave, Garland chase and Snow sparkles. **Individual-bulb writes are not implemented**: these use a whole-strand pulse fallback on hardware. The roofline editor and individual bulb colors are previews, not claims of verified per-pixel output.

Music schedules require Bluefy visible, phone awake, retained audio and schedules enabled. Strand timers use recovered controller on/off records, with readback verification, and are separate from music schedules. Wi-Fi transport, autonomous uploaded shows and Shortcuts are not implemented. The physical color gamut and any dedicated white LEDs depend on the strand; RGB warm-white approximations cannot add hardware channels.

## Repository

The root contains the ready-to-serve GitHub Pages build. `source/` contains editable React/TypeScript source. Pages should deploy from main / root. No paid backend or API is used.

To rebuild: `cd source`, `npm install`, `npm run build`; copy `source/dist/` contents into the repository root. Keep relative paths for repository-subpath hosting. Tests use Node 22+ `node --experimental-strip-types phone.test.mjs` (and `device-timers.test.mjs`, `schedule.test.mjs`, `show.test.mjs`, `effects.test.mjs`).

Do not publish raw house photos, addresses, device identifiers or private Bluetooth logs. The shipped house is an illustration. Noindex is a crawler request, not privacy or access control: a public repository and Pages site remain publicly accessible.
