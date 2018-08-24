import React, { Component } from 'react';
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class SimpleSlider extends Component {
	render() {
		const settings = {
			dots: true,
			fade: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnHover: true
		};

		return (
			<div className="profile-pic-slide__holder">
				<Slider {...settings}>
					{this.props.pics !== undefined && this.props.pics.length !== 0 ?
						this.props.pics.map((img, i) => (
							<div key={i} className="profile-pic-slide">
								<img src={img} alt="This user"/>
							</div>))
							:
							this.props.ava !== "" ? (<img src={this.props.ava} alt="This user"/>)
							:
							<img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="This user"/>
					}
				</Slider>
			</div>
		);
	}
}

export default SimpleSlider;