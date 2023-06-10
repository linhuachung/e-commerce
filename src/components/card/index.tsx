import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import { Images } from '../../theme';

function Card({ data }) {
    return (
        <div className="card-item-container">
            <div className="card-content">
                <div className="card-image">
                    <img
                        src={Images.Images.air_max}
                        alt="" className="image"/>
                    <div className="card-hover">
                        <div className="hover-content">
                            <div className="hover-item">
                                <img src={Images.Icons.heart_blue_icon} alt="" className='svg'/>
                            </div>
                            <div className="hover-item">
                                <img src={Images.Icons.shopping_card_blue_icon} alt="" className='svg'/>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to={'/detail/product'} className="card-info">
                    <div className="card-title">
                        <Link to={`/detail/${data?.id}`} className="title"><h3>FS - QUILTED MAXI CROSS BAG</h3></Link>
                    </div>
                    <div className="rate">
                        <Rate disabled={true} allowHalf defaultValue={3.5}/>
                    </div>
                    <div className="card-price">
                        <h2 className="price">$299,43</h2>
                        <div className="card-sale">
                            <h3 className="sale-off">$534,33</h3>
                            <h3 className="percent-off">
                                24% Off
                            </h3>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Card
