"use client"
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { ShoppingCartIcon } from 'lucide-react'
import { Separator } from './ui/separator'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import { link } from 'fs'
import { useCart } from '@/hooks/use-cart'
import CartItem from './CartItem'
import { ScrollArea } from './ui/scroll-area'

export default function Cart() {
  const {items} = useCart()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)

  }, [])
  
  const itemCount = items.length
  const cartTotal = items.reduce((total, {product}) => total + product.price, 0)

  const fee = 1
  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'><ShoppingCartIcon aria-hidden='true' className='h-6 w-6 flex flex-shrink-0 text-gray-400 group-hover:text-gray-500'/><span className='ml-2 text-sm font-md text-gray-700 group-hover:text-gray-800'>{isMounted ? itemCount : null}</span></SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>
            Cart({itemCount})
          </SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6 capitalize'>
              <ScrollArea>
              {items.map(({product}) => (
                <CartItem product={product} key={product.id}/>
              ))}
              </ScrollArea>
            </div>
            <div className='space-y-4 pr-6'>
              <Separator/>
              <div className='pr-6 space-y-1.5'>
                <div className='flex'>
                  <span className='flex-1 capitalize'>shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex'>
                  <span className='flex-1 capitalize'>transaction fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1 capitalize'>total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link href={"/cart"} className={buttonVariants({className: "w-full"})}>Continue to Checkout</Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ): (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground' aria-hidden="true">
              <Image src="/hippo-empty-cart.png" fill alt="empty cart" />
            </div>
            <div className='text-xl font-semibold capitalize'>your cart is empty</div>
            <SheetTrigger asChild>
              <Link href={"/products"} className={buttonVariants({variant: "link", size: "sm", className: "text-sm text-muted-foreground capitalize" })}>add items to your cart to checkout</Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
