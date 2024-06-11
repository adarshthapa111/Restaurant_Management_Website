import React from 'react'
import { Link } from 'react-router-dom'
const PaymentSuccess = () => {
  return (
    <div>
       <section className="flex flex-col items-center justify-center h-[80vh] gap-6">
      <div className="bg-green-100 p-6 rounded-full dark:bg-green-900/20">
        <CheckIcon className="h-12 w-12 text-green-500 dark:text-green-400" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Payment Successful</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Your payment was processed successfully. Thank you for your business.
        </p>
      </div>
      <Link to="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        href="#"
      >
        Continue Shopping
      </Link>
    </section>
    </div>
  )
}

function CheckIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    )
  }

export default PaymentSuccess
