import React, { Fragment } from 'react'
import { Images } from '../../../theme';
import { Dropdown } from 'antd';
import Button from '../../../components/button';
import { useSelector } from 'react-redux';
import './style.scss'
import { Link } from 'react-router-dom';

const renderCartItems = (dataCart) => {
    return (
        <div className='cart-container'>
            <div className="cart-item-left">
                <div className="cart-image">
                    <img
                        src={Images.Images.air_max}
                        alt="" className="image"/>
                </div>
                <div className="cart-title">
                    <Link to={`/detail/${dataCart.productId}`}>{dataCart.title}</Link>
                </div>
                <div className="cart-qty">
                    <p>Quality: {dataCart.quality}</p>
                </div>
            </div>
            <div className="cart-item-right">
                <p>Price: ${parseFloat(dataCart.price)}</p>
            </div>
        </div>
    )
}

function CartHeader() {
    const { cart } = useSelector(state => state.product)
    let items = []
    if (cart.data.length > 3) {
        const dataCart = cart.data.slice(0, 3).map((item, index) => {
            return {
                label: renderCartItems(item),
                key: index
            }
        })
        items.push(...dataCart, {
            label: <Link to={'/cart'}>See more ({cart.data.slice(3).length})</Link>,
        })
    }
    if (cart.data.length <= 3) {
        const dataCart = cart.data.map((item, index) => {
            return {
                label: renderCartItems(item),
                key: index
            }
        })
        items.push(...dataCart, {
            label: <Link to={'/cart'}>Checkout</Link>,
        })
    }
    if (!cart.data.length) {
        items = [
            {
                label: 'No data',
                key: '1',
            },
        ]
    }
    return (
        <Fragment>
            <Dropdown
                menu={{
                    items,
                }}
                trigger={['click']}
            >
                <Button className='btn-cart'>
                    <img src={Images.Icons.shopping_card_icon} alt="icon"/>
                    {cart.totalCount > 0 ? <span className='badge badge-warning' id='lblCartCount'>
                        {cart.totalCount}
                    </span> : null}
                </Button>
            </Dropdown>
        </Fragment>
    )
}

export default CartHeader
