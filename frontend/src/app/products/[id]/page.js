import { Star } from "lucide-react";
import ImageShowcase from "./_components/ImageShowcase";
import RelatedProducts from "./_components/RelatedProducts";
import AddToCart from "../_components/AddToCart";
import { getProductById } from "@/api/products";
import getShortDescription from "@/helpers/getShortDescription";
import ExpandableDescription from "./_components/ExpandableDescription";

const ProductDetailPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);
  const images = product.imageUrls?.length
    ? product.imageUrls
    : ["/placeholder.png"];
  const lowStock = product.stock !== undefined && product.stock < 10;
  const shortDescription =
    product.shortDescription || getShortDescription(product.description);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 bg-background">
        <div className="grid md:grid-cols-2 gap-10">
          <ImageShowcase
            width={800}
            images={images}
            name={product.name}
            stock={product.stock}
            height={800}
            alt={product.name}
          />

          <div className="flex flex-col">
            <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full w-fit">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold text-heading mt-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 text-accent mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent" />
              ))}
              <span className="text-muted text-sm ml-1">(24 reviews)</span>
            </div>

            <p className="text-body mt-3">
              Brand:{" "}
              <span className="font-medium text-heading">{product.brand}</span>
            </p>

            <p className="text-primary text-3xl font-bold mt-4">
              Rs. {product.price.toLocaleString()}
            </p>

            <p
              className={`text-sm mt-2 font-medium ${
                lowStock ? "text-error" : "text-success"
              }`}
            >
              {product.stock > 0
                ? `In stock: ${product.stock} units`
                : "Out of stock"}
            </p>

            {shortDescription && (
              <p className="text-body text-sm leading-relaxed mt-4">
                {shortDescription}
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <AddToCart product={product} />
              <button className="flex-1 border border-slate-300 text-heading text-sm font-medium py-3 rounded-full hover:bg-card hover:border-slate-400 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <ExpandableDescription description={product.description} />
        </div>
      </div>

      <RelatedProducts category={product.category} currentId={product._id} />
    </>
  );
};

export default ProductDetailPage;
