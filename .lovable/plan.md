## Fixes

**1) PUMP shows "Jun 4" instead of "Jun 5"**
The release's RSS `pubDate` is parsed and formatted with `toLocaleDateString` using the viewer's local timezone. A UTC midnight date shifts back a day in US timezones. Fix `formatDate` in `src/components/ciara/MusicFeed.tsx` to format in UTC (`timeZone: "UTC"`) so the date matches the publish date everywhere.

**2) "Contact" link in mobile menu does nothing**
In `src/components/ciara/StickyNavCiara.tsx` the nav links point to `#book`, but the footer section id is `#contact` (see `BookingFooter.tsx`). Update the `links` array entry from `{ href: "#book", label: "CONTACT" }` to `{ href: "#contact", label: "CONTACT" }` so both desktop and mobile menu jump to the contact section.

No other files affected.