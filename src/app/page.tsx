import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { Product } from "@/payload-types";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    icon: ArrowDownToLine,
    desc:"get assets delivered in negotiable timespan"
  },

  {
    name: "Guaranteed Quality",
    icon: CheckCircle,
    desc:"Every asset in our platform has a guarenteed quality by our team"
  },

  {
    name: "Green, Green, Green",
    icon: Leaf,
    desc:"we pledge allegiance to save our planet by producing non-toxic assets"
  }
]


export default function Home() {
    return (
    <>
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">        
        <h1 className="text-4xl font-bold tracking-light text-gray-900 sm:text-6xl">Marketplace for high quality <span className="text-violet-600">digital assets</span>.</h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">Welcome to DigitH. Every asset is verified by our team to ensure quality standarts</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/products" className={buttonVariants()}>Browse Trending</Link>
          <Button variant='ghost'>Our Promises &rarr;</Button>
        </div>
      </div>

      <ProductReel query={{sort: "desc", limit:4}} href="/products" title="Brand new" />
      {/* TODO: List prod. */}
    </MaxWidthWrapper>

    <section className="border-t border-gray-200 bg-gray-50">
      <MaxWidthWrapper className="py-20">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk)=>(
            <div key={perk.name} className="text-center md:flex md:item-start md:text-left lg:block lg:text-center">
              <div className="md:flex-shrink-0 flex justify-center ">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900">
                  {<perk.icon className="w-1/3 h-1/3"/>}
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
    </>
  )
}
