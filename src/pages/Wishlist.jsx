import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../Redux/WishlistSlice";
import { addToCart } from "../Redux/CartSlice";

function WishList() {
  const wishListArray = useSelector((state)=>state.wishlistReducer)
  const dispatch = useDispatch()
  const handleWishList = (product) =>{
    dispatch(removeFromWishlist(product))
    dispatch(addToCart(product.id))
  }

  return (
    <div>
      

      <Row className="justify-content-center" style={{ marginTop: "50px", marginBottom: "50px" }}>
          {wishListArray?.length > 0 ? (
            wishListArray.map((product, index) => (
              <Col className="mb-5" style={{ paddingLeft: "50px" }} sm={12} md={6} lg={4} key={index}>
                <Card className="shadow" style={{ width: "18rem" }}>
                <Card.Img height={'220px'} variant="top" src={product?.image} />
                <Card.Body>
                  <Card.Title>{product?.title.slice(0, 15)}...</Card.Title>
                    <p>{product?.description.slice(0, 55)}...</p>
                    <h5>${product?.price}</h5>
                    <div className="d-flex justify-content-between">
                      <Button variant="outline-primary"
                      onClick={()=>dispatch(removeFromWishlist(product.id))}
                      >
                        <i className="fa-solid fa-trash text-dange"></i> Delete
                      </Button>
                      <Button variant="primary"
                      onClick={() => handleWishList(product)}
                      >
                        <i className="fa-solid fa-cart-plus text-dark"></i> Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : null}
        </Row>



    </div>
  )
}

export default WishList