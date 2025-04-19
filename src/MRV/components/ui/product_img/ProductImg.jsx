import no_product from "../../../../assets/product-images/no_product.png";
import windowscraper from "../../../../assets/product-images/windowscraper.png";
import walloutlet from "../../../../assets/product-images/walloutlet.png";
import paintstick from "../../../../assets/product-images/paintstick.png";
import lifetime_warranty from "../../../../assets/product-images/lifetime_warranty.png";
import kobalt_hammer from "../../../../assets/product-images/kobalt_hammer.png";
import craftsman_wrench from "../../../../assets/product-images/craftsman_wrench.png";

// Create an object to map keys to images
const images = {
  no_product,
  windowscraper,
  walloutlet,
  paintstick,
  lifetime_warranty,
  kobalt_hammer,
  craftsman_wrench,
};

/**
 * Component to render a product image.
 *
 * @param {Object} props - The component props.
 * @param {string} props.sImgKey - The key for the image to display. Allowable values:
 *   - `"no_product"`: Default fallback image.
 *   - `"windowscraper"`: Image of a window scraper.
 *   - `"walloutlet"`: Image of a wall outlet.
 *   - `"paintstick"`: Image of a paint stick.
 *   - `"lifetime_warranty"`: Image representing a lifetime warranty.
 *   - `"kobalt_hammer"`: Image of a Kobalt hammer.
 *   - `"craftsman_wrench"`: Image of a Craftsman wrench.
 * @param {string} [props.sSize="4rem"] - The size of the image (applies to both width and height).
 * @param {string} [props.sWidth="4rem"] - The width of the image.
 * @param {string} [props.sHeight="4rem"] - The height of the image.
 * @param {string} [props.radius="0.5rem"] - The border radius of the image.
 * @returns {JSX.Element} The rendered product image.
 */
function ProductImg({
  sImgKey,
  sSize = "",
  sWidth = "4rem",
  sHeight = "4rem",
  radius = "0.5rem",
  bgColor = "color__white",
}) {
  // Use the key to get the image or fallback to no_product
  const imgSrc = images[sImgKey] || images.no_product;

  const oStyle = {
    width: sSize || sWidth,
    height: sSize || sHeight,
    borderRadius: radius,
  };

  return (
    <img
      src={imgSrc}
      alt="product"
      className={`${bgColor}`}
      style={oStyle}
      onError={(e) => {
        e.target.src = "/assets/product-images/no_product.png"; // Fallback to default image
      }}
    />
  );
}

export { ProductImg };
