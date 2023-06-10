import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom';
import { Images } from '../../theme';

function CardOutstanding() {
    return (
        <div className="card-container">
            <div className="card-content">
                <div className="card-title">
                    <Link to={'/'} className="title"><h3>FS - QUILTED MAXI CROSS BAG</h3></Link>
                </div>
                <div className="card-image">
                    <img
                        src={Images.Images.air_max}
                        alt="" className="image"/>
                </div>
                <div className="card-sale">
                    <h3 className="sale-off">$534,33</h3>
                    <h3 className="percent-off">
                        24% Off
                    </h3>
                </div>
                <div className="card-price">
                    <h2 className="price">$299,43</h2>
                </div>
            </div>
        </div>
    )
}

export default CardOutstanding
