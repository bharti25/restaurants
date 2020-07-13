import React, {Component} from 'react';
import '../../static/styles.css';
import restaurantData from '../data/restaurants.json';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pic from '../../static/images/1.jpg';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Banner1 from '../../static/images/11.jpg';
import Banner2 from '../../static/images/3.jpg';
import Banner3 from '../../static/images/4.jpg';
import Banner4 from '../../static/images/5.jpg';
import Banner5 from '../../static/images/6.jpg';
import Carousel from 'react-bootstrap/Carousel';

class Restaurants extends Component {
    constructor() {
        super();
        this.state = {
            cuisinesList: [],
            restData: restaurantData,
            index: 0,
            direction: null
        }
        this.handleSort = this.handleSort.bind(this);
        this.searchRestaurant = this.searchRestaurant.bind(this);
        this.filterData = this.filterData.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        })
    }
    searchRestaurant(e) {
        e.preventDefault();
        const restList = restaurantData.filter(function(restName) {
            return restName["Restaurant Name"].toLowerCase().includes(e.target.value)
        })
        this.setState({restData: restList});
    }
    handleSort(e) {
        e.preventDefault();
        console.log('e', e.target.value);
        if (e.target.value === 'ratings') {
            const ratingsSort = restaurantData.sort((a, b) => (a["Aggregate rating"] - b["Aggregate rating"])).reverse();
            this.setState({restData: ratingsSort})
        }
        else if(e.target.value === 'votes') {
            const voteSort = restaurantData.sort((a, b) => (a.Votes - b.Votes)).reverse();
            this.setState({restData: voteSort})
        }
        else if(e.target.value === 'cost') {
            const costSort = restaurantData.sort((a, b) => (a["Average Cost for two"] - b["Average Cost for two"]));
            this.setState({restData: costSort})
        }
        else {
            this.setState({restData: restaurantData})
        }
    }
    filterData(e) {
        e.preventDefault();
        const cList = restaurantData.filter(function(cName) {
            return cName.Cuisines.includes(e.target.value) ? cName : null
        })
        this.setState({restData: cList})
    }
    componentDidMount() {
        const cuisineList = restaurantData.map((r, i) => r.Cuisines.split(',').shift()).filter((val, id, arr) => arr.indexOf(val) === id)
        this.setState({cuisinesList: ['Select A Cuisine'].concat(cuisineList)})
    }
    render() {
        const { index, direction } = this.state
        return (
            <div className="restaurant_list detail_page">
                <Header />
                <section className="banner_section position-relative">
                    {/* <div className="bg-img"></div> */}
                    <Carousel
                        activeIndex={index}
                        direction={direction}
                        onSelect={this.handleSelect}
                        interval={null}
                        controls={false}
                    >
                        <Carousel.Item>
                            <img
                                className="d-block w-100 bg-img"
                                src={Banner1}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 bg-img"
                                src={Banner2}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 bg-img"
                                src={Banner3}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 bg-img"
                                src={Banner4}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 bg-img"
                                src={Banner5}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <div className="banner_center_text position-absolute w-100">
                        <div className="banner_content">
                            <h1 className="text-uppercase">Restaurants</h1>
                            {/* <p>The real place of Mindfullness & Healthy body</p> */}
                            <div className="banner_srch_box position-relative">
                                <input type="text" name="" placeholder="Search for the best Restaurants and Cafes" onChange={this.searchRestaurant} />
                                <FontAwesomeIcon icon="search" className="fas fa-search" />
                                {/* <button className="position-absolute"><FontAwesomeIcon icon="search" /></button> */}
                            </div>
                        </div>
                    </div>
                </section>
                <main className="main_content">
                    <div className="container">
                        <div className="content_section">
                            {/* <div className="top_section clearfix">
                                <h2>Restaurants</h2>
                            </div> */}
                            <div className="restaurant_list_content">
                                <Row>
                                    {/* <Col lg={6} md={6}></Col> */}
                                    <Col lg={12} md={12} sm={12} xs={12} className="selects">
                                        <select className="selectTool" onChange={this.filterData}>                                            
                                            {
                                                this.state.cuisinesList.map((cuisine, i) => {
                                                    return (
                                                        // <option>Select Cuisine</option>
                                                        <option value={cuisine} key={i}>{cuisine}</option>
                                                    )
                                                })
                                            }                                            
                                        </select>
                                        <select className="selectTool" onChange={this.handleSort}>
                                            <option>Select to Sort</option>
                                            <option value="ratings">Sort by Ratings</option>
                                            <option value="votes">Sort by Votes</option>
                                            <option value="cost">Sort by Avg. Cost for Two</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        this.state.restData.map((restaurant, i) => {
                                            return (
                                                <Col lg={4} md={6} sm={12} xs={12} key={restaurant["Restaurant ID"]}>
                                                    <div>
                                                        <div className="restaurant_list_box position-relative">
                                                            <div className="list_img">
                                                                <img src={pic} alt="Branch_Cover_Photo" />                                                                
                                                            </div>
                                                            <div className="rest_list_content clearfix">
                                                                <div className="list_heading clearfix mb-3">
                                                                    <div className="list_headign_left">
                                                                        <h4>
                                                                            {restaurant["Restaurant Name"]}                                                                            
                                                                        </h4>                              
                                                                        {(() => {
                                                                            switch (true) {
                                                                                case (restaurant["Aggregate rating"] >= 4.5): return (<span className="clr" style={{backgroundColor: "#0a7002"}}>★ {restaurant["Aggregate rating"]}</span>);
                                                                                case (restaurant["Aggregate rating"] >= 4.0): return (<span className="clr" style={{backgroundColor: "#1ced0c"}}>★ {restaurant["Aggregate rating"]}</span>);
                                                                                case (restaurant["Aggregate rating"] >= 3.5): return (<span className="clr" style={{backgroundColor: "#fcf405"}}>★ {restaurant["Aggregate rating"]}</span>);
                                                                                case (restaurant["Aggregate rating"] >= 3.0): return (<span className="clr" style={{backgroundColor: "#ff9d00"}}>★ {restaurant["Aggregate rating"]}</span>);
                                                                                default: return (<span className="clr" style={{backgroundColor: "#FFF", color: "#000"}}>★ {restaurant["Aggregate rating"]}</span>)
                                                                            }
                                                                        })()}                                          
                                                                    </div>
                                                                    <div className="list_btm_text">
                                                                        <p><label>Cuisines: </label>
                                                                            <span>{restaurant.Cuisines}</span>
                                                                        </p>
                                                                        <p><label>Cost for Two: </label><span>₹ {restaurant["Average Cost for two"]}</span></p>
                                                                        {/* <p>
                                                                            <label>Table Booking: </label>
                                                                            <span>
                                                                                {(() => {
                                                                                    switch (true) {
                                                                                        case (restaurant["Has Table booking"] = "Yes"):
                                                                                            return "Not Available";
                                                                                    
                                                                                        default:
                                                                                            return "Yes";
                                                                                    }
                                                                                })}
                                                                            </span>
                                                                        </p>
                                                                        <p><label>Cost for Two: </label><span>₹ {restaurant["Average Cost for two"]}</span></p>                                                                         */}
                                                                    </div>
                                                                </div>
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    } 
}

export default Restaurants;