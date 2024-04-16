import { PRODUCT_CATEGORIES } from "@/config";
import { Product } from "@/payload-types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";


export default function CartItem({product}: {product: Product}) {
    const {image} = product.images[0]
    const label = PRODUCT_CATEGORIES.find(({value}) => value === product.category)?.label
    

    const {removeItem} = useCart()

  return (
    <div className="space-y-3 py-2">
        <div className="flex justify-between items-start gap-4">
            <div className="space-x-4 flex items-center">
                <div className="aspect-square h-16 w-16 min-w-fit overflow-hidden rounded relative">
                    {typeof image !== "string" && image.url ? (
                        <Image src={image.url} alt={product.name} fill className="absolute object-cover"/>

                    ) : (
                        <div className="flex h-full items-center justify-center bg-secondary">
                            <ImageIcon className="h-4 w-4 text-muted-foreground"/>
                        </div>
                    )}
                </div>

                <div className="flex flex-col self-start">
                    <span className="line-clamp-1 text-sm font-medium mb-1">{product.name}</span>
                    <span className="capitalize line-clamp-1 text-xs text-foreground">{label}</span>
                    <div className="text-xs text-muted-foreground mt-4">
                        <button onClick={() => removeItem(product.id)} className="flex items-center gap-0.5"><X className="w-3 h-4"/>Remove</button>
                    </div>
                </div>
            </div> 

            <div className="flex flex-col space-y-1 font-medium">
                <span className="ml-auto line-clamp-1 text-sm">{formatPrice(product.price)}</span>
            </div>
        </div>
    </div>
  )
}
