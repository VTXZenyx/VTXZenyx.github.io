# Viraj Gandhi’s portfolio

Personal portfolio for Viraj Gandhi, a Wellington student studying Data Science and Information Systems at Victoria University of Wellington. [Live site](https://vtxzenyx.github.io/) · [GitHub](https://github.com/VTXZenyx) · [Email](mailto:gandhiviraj2006@gmail.com)

## Local development

From the repository root, run `python3 -m http.server 4173` and open `http://localhost:4173/`. The site uses static HTML, CSS and JavaScript and can be served directly from the GitHub Pages publishing branch. The résumé is the original `resume.pdf`.

The six project cards and screenshot captions live in `index.html`. Their detail dialogs use the matching keys in `PROJECTS` in `script.js`. The same script handles the animated heading, navigation and Playground. Best scores stay in the visitor’s browser.

## Project visuals

| Project | Evidence shown |
| --- | --- |
| [VEE QuoteDesk](https://github.com/VTXZenyx/vee-parts-quote-intelligence/tree/d23f17e/docs/images) | Original enquiry workspace and quote review screenshots. Use the two gallery controls to switch views or open an image at full size. The records are synthetic. |
| [VEE Quant Research](https://github.com/VTXZenyx/vee-quant-research/tree/7cf77dc) | Chart of candidate spreads from the public offline demo, compared with its configured spread limit. The values describe synthetic market inputs. |
| [AI Cricket Mentor](https://github.com/VTXZenyx/ai-cricket-virat-kohli-app/tree/312be5f) | Captured from the locally built Next.js message screen. |
| [Data Analysis & Programming](https://github.com/VTXZenyx/data-analysis-and-programming/tree/51b2d3d/projects/05-clustering) | Repository comparison plot from the independent AI-assisted clustering study, alongside its R implementation. |
| [Course Enrolment](https://github.com/VTXZenyx/course-enrolment-web-app/tree/4426821) | The card uses the original [WAID login screenshot](https://github.com/VTXZenyx/VTXZenyx.github.io/blob/dea06c4/assets/course-enrolment-preview.png), cropped to remove its outer frame. The details dialog also links to the signed-in course feed captured with the bundled fictional student data. |
| [SQL portfolio](https://github.com/VTXZenyx/sql-database-portfolio/blob/62038287efcb77f5505b8751d493b7fb45c15824/sql/database-design/messaging-database.sql) | Entity-relationship diagram of the group membership tables in the messaging schema. It shows both foreign keys in the composite primary key of Group_Member. |

The VEE DataDesk drawing is a concept for the proposed next build. Manrope, IBM Plex Mono and the DejaVu navigation glyphs are served locally. Their licences accompany the font files.

## Wellington map credits

The regional map and its mobile detail use [GSHHG 2.3.7 shoreline data](https://github.com/GenericMappingTools/gshhg-gmt/releases/tag/2.3.7), distributed under LGPL 3 or later. The licence notices accompany the images. Roads come from [Natural Earth](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/roads/) (public domain).

Hillshade and contours were rendered from the reprojected [1 km New Zealand elevation raster](https://github.com/Nowosad/spDataLarge/blob/master/inst/raster/nz_elev.tif), distributed through spDataLarge from Mapzen Terrain Service. Copyright 2011 Crown copyright (c) Land Information New Zealand and the New Zealand Government. All rights reserved. [Mapzen source attribution](https://github.com/tilezen/joerd/blob/master/docs/attribution.md#land-information-new-zealand-linz) · [CC BY 3.0 NZ](https://creativecommons.org/licenses/by/3.0/nz/).

## Checking changes

Run `node --check script.js`, then open the local site. Check both QuoteDesk views, project dialog focus and Escape, mobile navigation, both CV actions and the three Playground games. Check keyboard controls and reduced motion and verify the narrowest layout at 320 CSS pixels.
