## Fix duplicate CONTACT in mobile menu

In `src/components/ciara/StickyNavCiara.tsx`, the mobile menu maps over `links` (which already includes `{ href: "#book", label: "CONTACT" }`) and then appends a hardcoded extra `→ CONTACT` mailto `<li>` below it, producing two CONTACT entries.

**Change**: Remove the trailing hardcoded `<li>` with the mailto CONTACT link from the mobile drawer. The existing `#book` CONTACT entry from the `links` array stays and continues to scroll to the booking section, matching desktop behavior.

No other changes.