import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../config/routes'
import { BsCartCheckFill } from 'react-icons/bs'

interface Props {}

function ThankYou(props: Props) {
    const {} = props

    return (
        <div className='w-full max-w-[768px] md:mx-auto  py-10 gap-y-3  shadow-custom mt-6 mb-40 flex justify-center items-center flex-col'>
            
            <BsCartCheckFill size={56} className='text-primary' />
            <h1 className='text-4xl'>Thank you !</h1>
            <p>You order was successfuly completed.</p>

        <Link to={routes.product} className='rounded-xl bg-gray-300 hover:bg-primary transition-all duration-300 ease-in-out text-black hover:text-white p-4'>
        Continue shopping
        </Link>

        </div>
    )
}

export default ThankYou
