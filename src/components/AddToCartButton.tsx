"use client"
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/payload-types'

export default function AddToCartButton({product}: {product: Product}) {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const {addItem} = useCart()

    useEffect(()=>{
        const timeout= setTimeout(()=>{
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

  return (
    <Button onClick={()=>{addItem(product), setIsSuccess(true)}} className='w-full capitalize' size={'lg'}>{isSuccess ? "successfully added" : "add"} to cart
    </Button>
  )
}
