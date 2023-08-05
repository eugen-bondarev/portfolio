import clsx from 'clsx'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import Button from '../Button'
import { ReactComponent as CrossIcon } from '../../assets/svg/cross.svg'
import { ReactComponent as CartIcon } from '../../assets/svg/cart.svg'
import { useStore } from '@nanostores/react'
import { productsInCart } from '../../frontend/index'
import styles from './styles.module.scss'
import createFormData from '../../frontend/util/createFormData'
import { Cart } from 'types/cart'

const CartButton = () => {
  const cart = useStore(productsInCart)
  const [open, setOpen] = useState(false)
  const [loadingIds, setLoadingIds] = useState<number[]>([])

  const setLoadingId = (value: boolean, i: number) => {
    if (value) {
      setLoadingIds((current) => [...current, i])
    } else {
      setLoadingIds((current) => current.filter((item) => item !== i))
    }
  }

  const checkLoading = (i: number) => loadingIds.includes(i)

  const removeFromCart = async (i: number) => {
    const key = cart.products[i].key
    const ID = cart.products[i].ID
    const variantId = cart.products[i].variantId
    if (!key || !ID) {
      return
    }
    const url = new URL(
      `${window.location.origin}/?wc-ajax=remove-from-cart-v2`
    )
    setLoadingId(true, i)
    const response = await fetch(url, {
      method: 'POST',
      body: createFormData({ productId: variantId ? variantId : ID, key }),
    })
    const body: Cart = await response.json()
    productsInCart.set(body)
    setLoadingId(false, i)
  }

  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>

  useEffect(() => {
    const callback = (e: MouseEvent) => {
      if (!ref.current || !buttonRef.current || !e.target) {
        return
      }
      if (!ref.current.contains(e.target as HTMLElement)) {
        if (buttonRef.current.contains(e.target as HTMLElement)) {
          return
        }
        setOpen(false)
      }
    }
    window.addEventListener('click', callback)
    return () => window.removeEventListener('click', callback)
  }, [ref, buttonRef])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((current) => !current)}
        className="text-3xl w-12 h-12 outline-none"
      >
        <CartIcon />
        {cart.products.length > 0 ? (
          <span className="flex absolute bg-accent text-white right-0 top-0 text-sm rounded-full items-center justify-center w-4 h-4">
            {cart.products.length}
          </span>
        ) : null}
      </button>
      {open ? (
        <div
          ref={ref}
          className="shadow-xl min-w-[280px] bg-light-1 flex flex-col py-3 rounded-xl absolute z-[2] right-[-20px] top-14 text-dark-1"
        >
          <div className="absolute right-[35px] top-[-8px] border-solid border-b-light-1 border-b-8 border-x-transparent border-x-8 border-t-0"></div>
          <div className="max-h-72 min-h-20 overflow-auto">
            {cart.products.length === 0 ? (
              <p className="px-4 text-center">Dein Warenkorb ist leer</p>
            ) : null}
            {cart.products.map((product, i) => {
              const last = i === cart.products.length - 1
              const loading = checkLoading(i)
              const variant = product.variantId
                ? product.variants.find(
                    (variant) => variant.ID === product.variantId
                  )
                : undefined

              return (
                <div
                  className={clsx(
                    'transition flex border-b-[1px] border-light-3 last:border-b-0 bg-light-1 p-4 justify-between items-center',
                    {
                      'z-[3] relative': last,
                      'opacity-30 pointer-events-none': loading,
                    }
                  )}
                  key={i}
                >
                  <div className="flex gap-4">
                    <div className={clsx('w-16 h-16', styles.previewImage)}>
                      <img src={product.thumbnail} alt="" />
                    </div>
                    <div className="flex flex-col">
                      <p className="!m-0 text-sm lg:text-base">
                        {product.title}
                        {variant ? (
                          <>
                            {' '}
                            -{' '}
                            <span className="font-bold text-sm">
                              ({variant.title})
                            </span>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(i)}
                    className="w-8 h-12 min-w-[2rem] text-xl"
                  >
                    <CrossIcon />
                  </button>
                </div>
              )
            })}
          </div>
          <div
            className={clsx(
              { [styles.cartPanel]: cart.products.length > 0 },
              'flex justify-between items-center px-3'
            )}
          >
            <div
              className="text-center w-full font-bold"
              dangerouslySetInnerHTML={{ __html: cart.total }}
            />
            <Button
              disabled={cart.products.length === 0}
              href="/kasse"
              className="!text-base"
            >
              Zur Kasse
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default CartButton
