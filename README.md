# Christmas Glow

A quiet Christmas-light studio with original vintage-card artwork, cream paper, evergreen ink and cranberry red. No server, account, analytics, API key or paid service is required by the app.

## Put it on GitHub Pages from your iPhone

1. Download this ZIP to Files and tap it to extract.
2. In your GitHub repository, upload `index.html`, the `index-….js` file, the `index-….css` file, and `christmas-house.png` together at the repository root. All four are in the ZIP’s top level. Upload the extracted files, not this ZIP. The `.nojekyll` file is optional for these filenames.
3. In repository Settings → Pages, select **Deploy from a branch**, your branch (usually `main`), and **/(root)**. Save. Open the HTTPS address GitHub provides once the deployment completes.

No npm, Mac, terminal, or build is needed to publish these finished files. GitHub’s upload interface may be easier with Safari’s Request Desktop Website. The optional `editable-source.zip` is for later code changes; it does not need uploading.

Official Pages setup: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## What works

- Colors, golden-white approximations and brightness previews.
- Individual bulb selection, editable path anchors, start, center and reverse direction.
- Local music decoding and rhythmic onset analysis, animated show previews and cue export.
- Local settings, project export/restore, saved routine drafts.
- Manual Bluetooth discovery, device identification, power and whole-strand HSV test commands recovered from Hello Fairy’s APK. Tests are gated on a valid device reply.

## What is still a test

The Lights, Music and Layout tabs are screen previews. The only hardware commands are in Connect. Your physical controller has not been tested here. A successful write does not prove that it changed the lights.

Wi-Fi control, individual-bulb hardware writes, live music streaming, active device timers and automatic Shortcuts actions are not implemented. GitHub Pages does not add these capabilities. The APK’s traced curtain upload path uses raw TCP; it does not establish your C9 model’s Wi-Fi protocol. The golden-white slider mixes RGB; it cannot create a white LED channel that the hardware lacks.

For Bluetooth on iPhone, open the site in a compatible browser, such as Safari with Beacio enabled for the site, or Bluefy. Use a normal browser tab, not a standalone Home Screen window. Close Hello Fairy, tap Connect, then Read device. Check power and color results on the strand.

Beacio: https://apps.apple.com/us/app/beacio/id6761301368
Bluefy: https://apps.apple.com/us/app/bluefy-web-ble-browser/id1492822055

## Your files and privacy

Your real house photos, address and APK are not included. The cottage is original AI-generated illustration, not a photograph of your house. Painted bulbs in the illustration remain visible even when the interactive preview layer is off. Upload your own photo in Layout for a clearer installation preview; it stays in that browser tab. Audio is processed locally and needs choosing again after reload. Settings save in this browser; Save settings makes a portable backup.

There is no account or access control. Pages is public. The noindex request discourages search indexing but cannot make a public site secret. Do not upload personal photos, credentials or connection logs to the repository.

## Editing

Unzip editable-source.zip separately. Requires a compatible Node version for Vite 8 (22.12+). Install dependencies with npm install and build with npm run build. Output is in dist; upload its contents keeping the assets directory intact, or flatten assets and update index.html as in this release. Tests: node --experimental-strip-types show.test.mjs and node --experimental-strip-types phone.test.mjs.

## Validation

Production build passed. Rhythm tests cover silence, synthetic 120 BPM onsets, direction mapping, path spacing and warmth values. Bluetooth mock tests cover command vectors, response framing, checksums, identification, gated writes, disconnect and unsupported browsers. Browser review covered the artwork, navigation, layout editing and disabled hardware controls. Physical iPhone/strand testing remains necessary.
