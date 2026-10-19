[README.md](https://github.com/user-attachments/files/33658737/README.md)# WoodNest Furniture Store — Step 1

Responsive furniture storefront starter built with HTML, Tailwind CSS CDN, custom CSS, JavaScript and static JSON.

## Files
- `index.html` — home page
- `products.json` — sample furniture catalog
- `css/style.css` — custom responsive styles
- `js/app.js` — product rendering, mobile navigation, cart count, demo newsletter

## Run locally
1. Open the `WoodNest` folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` → **Open with Live Server**.

Do not open `index.html` by double-clicking it: browsers commonly block `fetch("products.json")` from `file://` URLs.

## Notes
- Product images are remote Unsplash images and require internet access.
- Cart count is wired to localStorage; full cart and checkout pages are the next steps.
- Newsletter signup is a frontend demo and does not send email.
- Tailwind CSS is loaded from its CDN for this no-build starter.
