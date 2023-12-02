import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../Redux/WishlistSlice";
import { addToCart } from "../Redux/CartSlice";

function Home() {
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]); // Initialize with an empty array
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/category/women's clothing`);
      const data = response.data;
      setAllData(data);
      setFilterData(data); // Initialize filterData with allData
    } catch (error) {
      console.log(`Error while performing axios`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // If search query is empty, show all products
      setFilterData(allData);
    } else {
      // If there's a search query, filter the products
      const filteredProducts = allData.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterData(filteredProducts);
    }
  };

  const dispatch = useDispatch()

  return (
    <>
      <Row style={{marginTop:"5000px"}} className='justify-content-center mt-5'>
        <Col lg={6}>
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder='Search items'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch();
              }}
            />
            <div className="input-group-append">
              <Button variant="outline-primary" onClick={handleSearch}>
                <i className="fa-solid fa-search"></i>
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <div>
        <Row className="justify-content-center" style={{ marginTop: "50px", marginBottom: "50px" }}>
          {filterData?.length > 0 ? (
            filterData.map((product, index) => (
              <Col className="mb-5" style={{ paddingLeft: "50px" }} sm={12} md={6} lg={4} key={index}>
                <Card className="shadow" style={{ width: "18rem" }}>
                <Card.Img height={'220px'} variant="top" src={product?.image} />
                <Card.Body>
                  <Card.Title>{product?.title.slice(0, 15)}...</Card.Title>
                    <p>{product?.description.slice(0, 55)}...</p>
                    <h5>${product?.price}</h5>
                    <div className="d-flex justify-content-between">
                      <Button variant="outline-primary"
                      onClick={()=>dispatch(addToWishlist(product))}
                      >
                        <i className="fa-solid fa-heart"></i> Wishlist
                      </Button>
                      <Button variant="primary"
                      onClick={() => dispatch(addToCart(product))}
                      >
                        <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : null}
        </Row>
      </div>
    </>
  );
}

export default Home;
