# Drop your Terra Pods photos here

Upload the five originals to this folder using **exactly these filenames**.
Once they're in, the site will pick them up automatically — no code changes
needed.

| Filename               | Photo                                                   | Used on                                  |
| ---------------------- | ------------------------------------------------------- | ---------------------------------------- |
| `pod-1-exterior.jpg`   | White curved-roof pod with butterfly chairs on balcony  | Home hero, Pod Solo card, gallery        |
| `pod-2-elevated.jpg`   | Elevated pod on stilts with glass walls + staircase     | Pod Duo card, gallery                    |
| `pod-3-interior.jpg`   | Interior with curtains, kitchen island, coved ceiling   | Pod Atelier card, gallery                |
| `pod-4-modular.jpg`    | Long red/black modular pod with full-length glass       | Pod Vista card, gallery                  |
| `factory.jpg`          | Manufacturing floor with chassis on flatbed + crane     | Home "process" section, gallery          |

## How to upload (no terminal needed)

1. Go to https://github.com/santiagorg1/Terra-Pods-Website/tree/claude/terra-pods-website-TOtIU/public/images
2. Click **Add file → Upload files**
3. Drag in your five photos. **Rename each to match the table above** (case-sensitive, lowercase, hyphens not underscores).
4. Commit message: `Add real Terra Pods photos`. Click **Commit changes**.

## Format tips

- JPG is preferred (smaller than PNG for photos). HEIC won't render in browsers — convert to JPG first.
- Recommended max width: **2400px**, quality 80–85.
- Keep filenames exactly as listed; if you change them, also update `src/lib/data.ts` and the references in `src/components/Hero.tsx` + `src/app/page.tsx`.

## Want to use different filenames?

Tell me what they are and I'll wire them up.
