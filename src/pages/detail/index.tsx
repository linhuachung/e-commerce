import React, { useState } from 'react'
import './style.scss'
import Page from '../../components/page';
import { Images } from '../../theme';
import ReactImageMagnify from 'react-image-magnify';
import { Radio, Rate } from 'antd';
import { Link, useParams } from 'react-router-dom';
import Select from '../../components/select';
import { HeartOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Button from '../../components/button';
import Carousel from '../../components/carousel';
import Card from '../../components/card';
import Information from './infomation';
import actions from '../../store/actions';
import { useDispatch } from 'react-redux';

const Detail = () => {
    const { productId } = useParams()
    const dispatch = useDispatch()
    const [indexDot, setIndexDot] = useState(0)
    const [imageView, setImageView] = useState(Images.Images.air_max)
    const [countProduct, setCountProduct] = useState(1)
    const imageDetail = [
        {
            name: 'air_max_detail_1',
            src: Images.Images.air_max_detail_1
        },
        {
            name: 'air_max_detail_2',
            src: Images.Images.air_max_detail_2
        },
        {
            name: 'air_max_detail_3',
            src: Images.Images.air_max_detail_3
        },
        {
            name: 'air_max_detail_4',
            src: Images.Images.air_max_detail_4
        },
        {
            name: 'air_max_detail_5',
            src: Images.Images.air_max_detail_5
        },
    ]
    const settings = {
        settingListImage: {
            dots: false,
            autoplay: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        },

        settingBestSeller: {
            beforeChange: (prev: any, next: any) => {
                setIndexDot(next)
            },
            appendDots: (dots: any) => (
                <div className='dot-custom'>
                    <ul className='list-dot'>
                        {dots.map((item: any, index: number) => {
                            return (
                                <li key={index}>{item.props.children}</li>
                            );
                        })}
                    </ul>
                </div>
            ),
            customPaging: (item: any) => (<div
                className={`${item === indexDot ? 'dot-active' : 'dot-inActive'} `}/>),
            dots: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }

    };

    const handleChangeImageView = (image) => {
        setImageView(image)
    }
    const handleChangeColor = (e) => {
        const { value } = e.target
    }

    const handleAddToCart = () => {
        const dataCart = {
            quality: countProduct,
            title: 'Product 1',
            price: Number(299.43).toLocaleString(),
            productId
        }
        dispatch(actions.addToCart(dataCart, (action: string, data: any, error: any) => {
            console.log('asdfasdfasd')
            console.log(action, data)
        }))
    }
    const handleCountProduct = (type) => {
        if (type === 'plus') return setCountProduct(count => count + 1)
        if (countProduct === 1) return
        else return setCountProduct(count => count - 1)
    }
    return (
        <Page>
            <div className='container'>
                <section className="product-price">
                    <div className="product-detail">
                        <div className="product-item product-item-top">
                            <div className="product-left product-image-view">
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        src: imageView,
                                        // width: 375,
                                        // height: 272,

                                        isFluidWidth: true,
                                    },
                                    largeImage: {
                                        src: imageView,
                                        width: 900,
                                        height: 900

                                    },
                                    hoverDelayInMs: 10
                                }} className='img-view'/>
                                <img src={imageView} className='img-view-responsive' alt='img'/>
                            </div>
                            <div className="product-image-list-responsive product-left product-image-list">
                                <Carousel settings={settings.settingListImage}>
                                    {imageDetail.map((item, index) => {
                                        return <Button className="item-img" key={index}>
                                            <img
                                                src={item.src}
                                                alt={item.name}
                                                onClick={() => handleChangeImageView(item.src)}
                                            />
                                        </Button>
                                    })}
                                </Carousel>
                            </div>
                            <div className="product-title-price product-right">
                                <div className="title-top">
                                    <h2 className="title">Nike Airmax 270 React</h2>
                                    <div className="rate">
                                        <Rate disabled={true} allowHalf defaultValue={4}/>
                                        <span className='rate-num'>0 rating</span>
                                        <span className='submit-review'><Link to={'/'}>Submit a review</Link> </span>
                                    </div>
                                </div>
                                <div className="title-bottom">
                                    <div className="price-content">
                                        <h2 className="price">$299.43</h2>
                                        <h3 className="sale-off">$534,33</h3>
                                        <h3 className="percent-off">
                                            24% Off
                                        </h3>
                                    </div>
                                    <div className="status-content">
                                        <div className="status-item">
                                            <p className="status-left">Availability:</p>
                                            <p className="status-right">In stock</p>
                                        </div>
                                        <div className="status-item">
                                            <p className="status-left">Category:</p>
                                            <p className="status-right">Accessories</p>
                                        </div>
                                        <div className="status-item">
                                            <p className="status-left">Free Ship</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-item product-item-mid">
                            <div className="product-color product-right">
                                <div className="product-color-item">
                                    <p className="product-color-left">Select Color:</p>
                                    <div className="product-color-right">
                                        <Radio.Group onChange={handleChangeColor} defaultValue="#006CFF">
                                            <Radio value="#006CFF" className='item1'/>
                                            <Radio value="#FC3E39" className='item2'/>
                                            <Radio value="#171717" className='item3'/>
                                            <Radio value="#FFF600" className='item4'/>
                                            <Radio value="#FF00B4" className='item5'/>
                                            <Radio value="#EFDFDF" className='item6'/>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="product-color-item">
                                    <p className="product-color-left">Size:</p>
                                    <div className="product-color-right">
                                        <Select
                                            defaultValue="xs"
                                            className='dropdown-size'
                                            // onChange={handleChange}
                                            options={[
                                                { value: 'jack', label: 'Jack' },
                                                { value: 'xs', label: 'XS' },
                                                { value: 'Yiminghe', label: 'yiminghe' },
                                                { value: 'disabled', label: 'Disabled', disabled: true },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-item product-item-bottom">
                            <div className=" product-left product-image-list">
                                <Carousel settings={settings.settingListImage}>
                                    {imageDetail.map((item, index) => {
                                        return <Button className="item-img" key={index}>
                                            <img
                                                src={item.src}
                                                alt={item.name}
                                                onClick={() => handleChangeImageView(item.src)}
                                            />
                                        </Button>
                                    })}
                                </Carousel>
                            </div>
                            <div className="product-add-cart">
                                <div className="cart-item item-left">
                                    <Button onClick={() => handleCountProduct('minus')}><MinusOutlined/></Button>
                                    <p>{countProduct}</p>
                                    <Button onClick={() => handleCountProduct('plus')}><PlusOutlined/></Button>
                                </div>
                                <div className="cart-item item-right">
                                    <Button onClick={handleAddToCart} className='add-cart'><ShoppingCartOutlined/> Add
                                        To Cart</Button>
                                    <Button className='like-cart'><HeartOutlined/></Button>
                                </div>
                            </div>
                        </div>
                        <div className="product-item product-share">
                            <div className="share-content">
                                <Button><img src={Images.Icons.facebook_icon_white} alt=""/>Share on Facebook</Button>
                                <Button><img src={Images.Icons.twitter_icon_white} alt=""/>Share on Twitter</Button>
                            </div>
                        </div>
                        <div className="product-item product-information">
                            <div className="product-information-content">
                                <Information/>
                            </div>
                        </div>
                    </div>
                    <div className="best-seller">
                        <h4 className="title">
                            BEST SELLER
                        </h4>
                        <div className="best-seller-content">
                            <Carousel settings={settings.settingBestSeller}>
                                {Array(4).fill(1).map((item, index) => {
                                    return <div className="best-seller-item" key={index}>
                                        <Card/>
                                    </div>
                                })}
                            </Carousel>
                        </div>
                    </div>
                </section>
                <section className="product-related">
                    <h1 className="title">
                        RELATED PRODUCTS
                    </h1>
                    <div className="related-container">
                        {Array(4).fill(1).map((x, ind) => <Card key={ind}/>)}
                    </div>
                </section>
            </div>
        </Page>
    )
}

export default Detail
