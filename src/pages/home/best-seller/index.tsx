import React, { useEffect, useState } from 'react'
import './style.scss'
import { Tabs } from 'antd';
import Card from '../../../components/card';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../store/actions';
import Button from '../../../components/button';

function BestSeller() {
    const { productList } = useSelector(state => state.product)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getProduct({ page }))
    }, [dispatch, page])

    const showMoreItem = () => {
        setPage(page => page + 1)
    }
    const renderItem = () => {
        return <div>
            <div className="item">
                {productList.data.map((item: any, index: number) => <Card data={item} key={index}/>)}
            </div>
            {productList.data.length !== productList.total &&
                <Button className="load-more" onClick={showMoreItem}>LOAD MORE</Button>
            }
        </div>
    }
    const itemsTabs = [
        {
            label: 'All',
            key: '1',
            children: renderItem(6),
        },
        {
            label: 'Bags',
            key: '2',
            children: renderItem(30),
        },
        {
            label: 'Sneakers',
            key: '3',
            children: renderItem(50),
        },
        {
            label: 'Belt',
            key: '4',
            children: renderItem(10),
        },
        {
            label: 'Sunglasses',
            key: '5',
            children: renderItem(8),
        },
    ]

    return (
        <section className='best-seller'>
            <div className="best-seller-container">
                <h1 className="title">
                    BEST SELLER
                </h1>
                <div className="best-seller-content">
                    <Tabs
                        defaultActiveKey="1"
                        items={itemsTabs}
                        centered
                    />
                </div>
            </div>
        </section>
    )
}

export default BestSeller
