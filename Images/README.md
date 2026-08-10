# Photo Inbox

Drop new photos here any time. When you ask Claude to "check the image
folder," it will inspect everything in this folder, figure out where
each photo belongs on the site, integrate it (resize/optimize into
`public/images/...`, update the relevant `src/data/*.ts` file), and
record what it did below — so the same photo is never processed twice
and you have a running log of what's been added.

Original files are left here untouched after integration (they're not
deleted), so this folder will keep growing — that's expected.

## Integration log

| File | Integrated as | Date |
| --- | --- | --- |
| `hero-brand.jpeg` | Homepage hero (`public/images/hero/hero-band-photo.jpg`) + About page group photo (`public/images/band/band-group-photo.jpg`) — a live performance shot showing the full six-piece lineup, resized/compressed for web. | 2026-07-23 |
| `Botb2026.jpg` | Performances page (`public/images/performances/botb-2026.jpg`) — official event poster for the 2026 SoFi Battle of the Bands, used on the "SoFi Battle of the Bands 2026" performance card (`src/data/performances.ts`). Resized/compressed for web. | 2026-07-24 |
| `Violet.jpeg`, `Graeden.jpeg`, `Aiden.png`, `Gavin.jpeg`, `Tyler.jpeg` | About page member profiles (`public/images/members/{name}.jpg`) — matched by filename to each member (`src/data/members.ts`). | 2026-07-24 |
| `Leo.jpeg` | About page member profile (`public/images/members/leo.jpg`) — matched by filename; this is the same guitarist seen (unidentified at the time) in `Preformance2.jpeg` in the gallery. Had EXIF portrait rotation; re-encoded to display upright. | 2026-07-25 |
| `NapaBotb2025.jpg` | Past performance card "SoFi Battle of the Bands Napa" (`public/images/performances/napa-botb-2025.jpg`) — official 2025 event poster; the printed stage schedule confirms Voltage played the Palisades Stage at noon. | 2026-07-24 |
| `SonomaBotb2025.jpeg`, `SonomaBotb2026.png` | Past performance cards "Music Nomad Battle of the Bands Sonoma" (`public/images/performances/sonoma-botb-2025.jpg`, `sonoma-botb-2026.jpg`) — official event posters for the May 2025 and May 2026 editions; venue (Grinstead Amphitheater, Sonoma Plaza) read directly off each poster. | 2026-07-24 |
| `Band1.jpeg`, `Band2.jpeg`, `Band3.jpeg` | Gallery, "Band" category (`public/images/gallery/band-0{1,2,3}.jpg`) — styled black-and-white band photoshoot images. | 2026-07-24 |
| `Group4.jpeg`, `Group5.jpeg` | Gallery, "Group Photos" category (`public/images/gallery/group-0{4,5}.jpg`) — candid outdoor group shots. | 2026-07-24 |
| `Preformance1.jpeg`–`Preformance6.jpeg` | Gallery, "Performances" category (`public/images/gallery/performance-0{1-6}.jpg`) — live show photos. Two (`Preformance2`, `Preformance5`) were shot in portrait but stored with EXIF rotation; re-encoded so they display upright everywhere. | 2026-07-24 |
| `Fundraising1.jpeg` | Gallery, "Community" category (`public/images/gallery/community-fundraising-01.jpg`) — a food-drive volunteering photo; didn't fit the original categories so a new "Community" category was added. | 2026-07-24 |
| `Advertisement.png` | Gallery, "Promotional" category (`public/images/gallery/promo-sonoma-announcement.jpg`) — an Instagram Story screenshot announcing the Sonoma Battle of the Bands. | 2026-07-24 |
| `Bassist.JPG`–`(4).JPG`, `Drums.JPG`–`(4).JPG`, `Guitarist.JPG`–`(8).JPG`, `Keys.JPG`–`(2).JPG`, `Singer.JPG`–`(7).JPG` | Gallery, "Performances" category (`public/images/gallery/performance-{07-31}.jpg`) — live shots of each performer (bass, drums, guitar ×2, keys, vocals) from the same show, scattered through the gallery grid rather than grouped by instrument. | 2026-08-09 |
| `Group.JPG` | Gallery, "Group Photos" category (`public/images/gallery/group-06.jpg`) — bassist and guitarist playing side by side. | 2026-08-09 |
| `Mascot.JPG` | Gallery, "Behind the Scenes" category (`public/images/gallery/behind-the-scenes-01.jpg`) — Voltage's lightning-bolt mascot plushie perched on an amp; first photo in this category, so its filter button now appears on the Gallery page. | 2026-08-09 |

Also used as **homepage hero slideshow slides** (`src/data/slideshow.ts`), alongside the existing hero photo — this is the one case where a gallery photo intentionally appears twice on the site: `Band2.jpeg`, `Group4.jpeg`, and the "Performances" shot `Preformance3.jpeg`.
