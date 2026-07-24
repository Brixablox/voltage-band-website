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
