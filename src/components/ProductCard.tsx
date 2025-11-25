import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-muted aspect-square transition-all duration-300 hover:shadow-xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm transition-all duration-300">
            <Badge variant="secondary" className="text-sm">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold text-sm md:text-base line-clamp-1 transition-colors duration-300 group-hover:text-accent">{product.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground transition-colors duration-300">{product.category}</p>
          <p className="font-bold text-accent transition-all duration-300 group-hover:scale-110">{`R ${product.price.toFixed(2)}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
