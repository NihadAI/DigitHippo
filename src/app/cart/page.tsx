"use client"

import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Check, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const {items, removeItem} = useCart()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const productIds = items.map(({product}) => product.id)
    const router = useRouter()
    const {mutate: checkOutCreateSession, isLoading} = trpc.payment.createSession.useMutation({
        onSuccess: ({ url }) => {
            if (url) router.push(url)
          },
    })

    useEffect(() => {
      setIsMounted(true)
    }, [isMounted])
    
    const cartTotal = items.reduce((total, {product}) => total + product.price, 0)

    const fee =1


    console.log(items)

    return (
        <div className="bg-white">
            <div className="mx-auto ma-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Shopping cart</h1>

                <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-16'>
                    <div className={cn("lg:col-span-7", {"rounded-lg border-2 border-dashed border-zinc-200 p-12" : isMounted && items.length === 0})}>
                        <h2 className='sr-only'>items in your cart</h2>

                        {isMounted && items.length === 0 ? (
                            <div className='h-full flex flex-col items-center justify-center space-y-1'>
                                <div className='relative text-muted-foreground h-40 w-40 mb-4' aria-hidden="true">
                                    <Image src="/hippo-empty-cart.png" fill loading='eager' alt='empty shopping cart hippo' />
                                </div>
                                <h3 className='font-semibold text-2xl capitalize'>Your cart is empty</h3>
                                <p className='text-muted-foreground'>Uh-oh! Nothing to show here</p>
                            </div>
                        ) : null}

                        <ul className={cn({"divide-y divide-gray-200 border-t border-b border-gray-200": isMounted && items.length > 0})}>
                            {items.map(({product}) => {
                                const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label
                                    
                                const {image} = product.images[0]
                                return(
                                    <li key={product.id} className='flex py-6 sm:py-10'>
                                        <div className='flex-shrink-0'>
                                            <div className='relative h-14 w-14'>
                                                        {typeof image !== "string" && image.url ? (<Image fill src={image.url} alt='product image' className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'/>) : null}
                                            </div>
                                        </div>

                                        <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                                            <div className='pr-9 relative sm:grid sm:grid-cols-2 sm:pr-0 sm:gap-x-6'>
                                                <div>
                                                    <div className='flex justify-between'>
                                                                <h3 className='text-sm'><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
                                                    </div>

                                                    <div className='mt-1 fle text-sm'>
                                                                <p className='text-muted-foreground'>Category: {label}</p>
                                                    </div>
                                                    <p className='mt-1 text-sm font-medium text-gray-900'>{formatPrice(product.price)}</p>
                                                </div>
                                                <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                                    <div className='absolute right-0 top-0'>
                                                        <Button variant="ghost" aria-label='remove product' onClick={() => removeItem(product.id)}><X className='h-5 w-5' aria-hidden="true"/></Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='mt-4 flex space-xx-2 text-sm text-gray-700'><Check className='h-5 w-5 flex-shrink-0 text-green-500'/><span>Eligible for instant delivery</span>
                                            </p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
                        <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>
                        <div className='mt-6 space-y-4'>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm text-gray-600'>Subtotal</p>
                                <p className='text-sm font-medium text-gray-900'>
                                    {isMounted ? (formatPrice(cartTotal)) : (
                                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                    )}
                                </p>
                            </div>

                            <div className='flex items-center justify-between border-t border-gray-200 pt-4 '>
                                <div className='flex items-center text-sm text-muted-foreground'>
                                    <span>Flat transaction fee</span>
                                </div>

                                <div className='text-sm font-medium text-gray-900'>
                                    {items.length > 0 ? formatPrice(fee) : <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />}
                                </div>
                            </div>

                            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                                <div className='text-base font-medium text-gray-900 '></div>
                                <div className='text-base font-medium text-gray-900'>
                                    {isMounted ? formatPrice(cartTotal + fee) : <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' /> }
                                </div>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <Button disabled={items.length === 0}  onClick={() => checkOutCreateSession({productIds})} className='w-full' size="lg">{isLoading ? <Loader2 className='h-4 w-4 animate-spin mr-1.5'/> : null}Checkout</Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
