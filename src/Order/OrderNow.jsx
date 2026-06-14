import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { createOrder } from '../services/api'

const CartSpan = ({ item, updateItemQuantity }) => {

  const [clicked, setClicked] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
    updateItemQuantity(item.id, quantity + 1)
  }

  const decrementQuantity = () => {
    if(quantity === 1) {
      setQuantity(1)
      updateItemQuantity(item.id, 1)
      setClicked(!clicked)
    }

    if (quantity > 0 && quantity !== 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
      updateItemQuantity(item.id, quantity - 1)
    }
  }

  const handleCartClick = () => {
    if (!clicked) {
      setQuantity(2)
      updateItemQuantity(item.id, 2)
    }
    setClicked(!clicked);
  };

  return (
    <div>
      {quantity === 1 && (
        <button
          className="p-2 btn btn-outline-success border-1"
          onClick={handleCartClick}
          style={{ fontWeight: 600 }}
        >
          Add More 
        </button>
      )}
      {quantity > 1 && (
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={decrementQuantity}
          >
            <i className="fa-solid fa-minus" style={{ fontSize: '12px' }}></i>
          </button>
          <span>{quantity}</span>
          <button
            className="btn btn-primary ms-2"
            onClick={incrementQuantity}
          >
            <i className="fa-solid fa-plus" style={{ fontSize: '12px' }}></i>
          </button>
        </div>
      )}
    </div>
  )
}

function OrderNow(props) {
  // cart items and order details from parent
  const { cartItems, setCartItems, orderDetails, setOrderDetails, orderFormData, setOrderFormData } = props

  console.log("her" ,cartItems)

  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(cartItems)
  }, [cartItems])

  const handleEmptyCart = () => {
    alert('Are you sure you want to empty the cart ?')
    setItems([])
    setCartItems([])
  }

  const handleRemoveItem = id => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
    setCartItems(updatedItems)
  }

  // Update quantity for a specific item
  const updateItemQuantity = (itemId, quantity) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === itemId ? { ...item, quantity } : item))
    )
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalSelectedItems = items.length;

  // Calculate today's date in YYYY-MM-DD format for date input min attribute
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  //forms - using parent state now
  const handleChange = event => {
    const { name, value } = event.target
    setOrderFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Validate that all fields are filled
    if (!orderFormData.name || !orderFormData.email || !orderFormData.phone || !orderFormData.option || !orderFormData.date) {
      alert('Please fill in all fields')
      return
    }
    const content = (
      <div>
        <p>Name: {orderFormData.name}</p>
        <p>Email: {orderFormData.email}</p>
        <p>Phone: {orderFormData.phone}</p>
        <p>Receiving as: {orderFormData.option}</p>
        <p>Date: {orderFormData.date}</p>
      </div>
    )
    setOrderDetails(content)
    // ✅ FIX: Don't clear form data here - it's needed for checkout
    // Form data will be cleared only after successful order submission in checkOut()
  }

  //conditional
  const [clicked, setClicked] = useState(false)
  const handleContentClick = () => {
    setClicked(!false)
  }

  const handleBuy = () => {
    window.scrollTo(0, document.body.scrollHeight - 1000);
  };

  const checkOut = async () => {
    //check if cart is empty
    if (items.length === 0) {
      alert('Please add items to cart')
      return
    }
    //check if cart has items and details are filled
    if (orderDetails === null && items.length > 0) {
      alert('Please fill the order details ! Click EDIT');

      window.scrollTo(0, 
        //slide a bit up to show the details
        document.body.scrollHeight - 1000 
        );

      return
    }

    // Prepare order data to send to backend using name from form
    const orderData = {
      customerName: orderFormData.name.trim(),
      email: orderFormData.email.trim(),
      phone: orderFormData.phone.trim(),
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalPrice: Math.floor(total + total * 0.02 * totalSelectedItems),
      deliveryAddress: orderFormData.option === 'delivery' ? 'To be confirmed' : 'Pickup',
      specialNotes: `Receiving as: ${orderFormData.option}, Date: ${orderFormData.date}`
    };

    try {
      const response = await createOrder(orderData);
      console.log('Order created successfully:', response.data);
      alert("Order Placed Successfully! Order ID: " + response.data._id);

      // Clear cart and form data after successful submission
      setItems([])
      setCartItems([])
      setOrderDetails(null)
      setOrderFormData({
        name: '',
        email: '',
        phone: '',
        option: '',
        date: ''
      })
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error placing order: ' + (error.response?.data?.error || error.message));
    }
  }



  return (
    <div className='p-4' style={{ marginTop: 50, backgroundColor: '#f6efd4 ' }}>

      <div className='d-flex flex-md-row flex-column col-12 px-lg-4 col-xl-10 gap-5 gap-sm-3 gap-lg-4 gap-xl-5 mx-auto justify-content-center mt-sm-5 '>

        <div
          className='shadow-effect p-3 col-md-7 col-lg-8 col-xl-8 co mx-auto  rounded-3'
          style={{ backgroundColor: '#f6efd6', maxHeight: '700px', overflowY: 'scroll' }}
        >
          <h1
            className='mb-5 ms-3'
            style={{ fontFamily: 'pacifico', textDecoration: 'underline' }}
          >
            Your Order....
          </h1>

          {items.length === 0 ? (
            <div
              className='d-flex justify-content-center align-items-center'
              style={{ height: '300px' }}
            >
              <h3 style={{ fontFamily: 'poppins' }}>
                No items added ,{' '}
                <Link to='/menu' style={{ fontFamily: 'pacifico' }}>
                  go to menu
                </Link>{' '}
                and select your favourite foods
              </h3>
            </div>
          ) : (
            items.map(item => (
              <div
                className='row mt-3 d-flex justify-content-center'
                key={item.id}
              >
                <div className='col-xl-10 mb-4 d-flex flex-lg-row  flex-column justify-content-between'>

                  <div className='col-xl-6 d-flex align-items-center justify-content-around mb-3'>

                    <img
                      className='rounded-2 me-xl-4 w-25 sm:w-50'
                      src={item.imageSrc}
                      alt={item.alt}
                    />
                    <h3 className='fs-4 col-6'>{item.name}</h3>
                  </div>

                  <div className='col-lg-6 d-flex align-items-center '>
                    <div className='d-flex w-100 justify-content-between align-items-center '>

                      <div className=' w-25 text-center'>
                        <h4 className='mx-auto'>
                          Rs. {item.price}
                        </h4>
                      </div>

                      <div className="d-flex">

                        <div className='me-2 '>
                          <CartSpan
                            item={item}
                            updateItemQuantity={updateItemQuantity}
                          />
                        </div>
                        <button
                          className='btn btn-outline-danger border-1 remove'
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className='d-flex justify-content-around'>
              <button
                className='btn btn-danger mb-5'
                style={{ marginTop: '2rem', fontWeight: 600 }}
                onClick={handleEmptyCart}
              >
                <i className='me-2 fa-regular fa-trash-can'></i> EMPTY CART
              </button>
              <button
                className='btn btn-success mb-5 d-md-none'
                style={{ marginTop: '2rem', fontWeight: 600 }}
                onClick={handleBuy}
              >
                <i class="fa-solid fa-bag-shopping me-2"></i> BUY NOW
              </button>
            </div>
          )}
        </div>

        <div className='col-md-5 col-lg-4 '>
          <div className='bg-white od'>
            <div className='d-flex bg-black justify-content-between align-items-center'>
              <h1
                style={{ fontFamily: 'poppins', fontWeight: 600 }}
                className='p-2 ms-1 text-white '
              >
                <span style={{ color: '#b80101' }}>M</span>yOrder{' '}
                <span style={{ color: '#b80101' }}>i</span>nfo
              </h1>
              <button
                type='button'
                className='btn btn-outline-secondary me-3 text-white'
                data-bs-toggle='modal'
                data-bs-target='#staticBackdrop'
                onClick={handleContentClick}
              >
                EDIT
              </button>
              <div
                className='modal fade'
                id='staticBackdrop'
                data-bs-backdrop='static'
                data-bs-keyboard='false'
                tabIndex='-1'
                aria-labelledby='staticBackdropLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog modal-dialog-centered mx-auto'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                        Edit your order info..
                      </h1>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                        onClick={() => setClicked(false)}
                      ></button>
                    </div>
                    <div>
                      <div className='modal-body'>
                        <form>
                          <div className='mb-3'>
                            <label
                              htmlFor='name'
                              className='form-label text-info-emphasis'
                            >
                              Customer Name
                            </label>
                            <input
                              type='text'
                              className='form-control border-secondary '
                              id='name'
                              name='name'
                              placeholder='Enter your full name'
                              onChange={handleChange}
                              value={orderFormData.name}
                            />
                          </div>
                          <div className='mb-3'>
                            <label
                              htmlFor='email'
                              className='form-label text-info-emphasis'
                            >
                              Email address
                            </label>
                            <input
                              type='email'
                              className='form-control border-secondary '
                              id='email'
                              name='email'
                              aria-describedby='emailHelp'
                              onChange={handleChange}
                              value={orderFormData.email}
                            />
                            <div id='emailHelp' className='form-text'>
                              We'll never share your email with anyone else.
                            </div>
                          </div>
                          <div className='mb-3'>
                            <label
                              htmlFor='phone'
                              className='form-label text-info-emphasis'
                            >
                              Phone number
                            </label>
                            <input
                              type='tel'
                              className='form-control border-secondary'
                              name='phone'
                              id='phone'
                              onChange={handleChange}
                              value={orderFormData.phone}
                            />
                          </div>
                          <div className='mb-3'>
                            <label
                              htmlFor='option'
                              className='form-label text-info-emphasis'
                            >
                              Select option
                            </label>
                            <div>
                              <div className='form-check form-check-inline'>
                                <input
                                  className='form-check-input  border-success'
                                  type='radio'
                                  name='option'
                                  id='pickup'
                                  value='pickup'
                                  onChange={handleChange}
                                  checked={orderFormData.option === 'pickup'}
                                />
                                <label
                                  className='form-check-label text-black'
                                  htmlFor='pickup'
                                >
                                  Pickup
                                </label>
                              </div>
                              <div className='form-check form-check-inline '>
                                <input
                                  className='form-check-input border-success'
                                  type='radio'
                                  name='option'
                                  id='delivery'
                                  value='delivery'
                                  onChange={handleChange}
                                  checked={orderFormData.option === 'delivery'}
                                />
                                <label
                                  className='form-check-label text-black'
                                  htmlFor='delivery'
                                >
                                  Delivery
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='mb-3'>
                            <label
                              htmlFor='date'
                              className='form-label text-info-emphasis'
                            >
                              Receiving Date
                            </label>
                            <input
                              type='date'
                              className='form-control border-secondary'
                              name='date'
                              id='date'
                              onChange={handleChange}
                              value={orderFormData.date}
                              min={todayString}
                            />
                          </div>
                        </form>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-warning'
                          data-bs-dismiss='modal'
                        >
                          Close
                        </button>
                        <button
                          type='submit'
                          className='btn btn-success'
                          data-bs-dismiss='modal'
                          onClick={handleSubmit}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='details p-2'>
              <div
                style={{ height: 80, fontFamily: 'serif' }}
                className={`d-block ${clicked ? 'd-none' : ''}`}
              >
                <h1 className='fs-3 p-3'>
                  Click{' '}
                  <span className='border border-2 border-dark p-1'>edit</span>{' '}
                  to update your order info
                </h1>
              </div>
              {orderDetails}
              <button type='button'
                className={` ${orderDetails !== null ? '' : 'd-none'} btn btn-danger `}
                onClick={
                  //reset form data
                  () => {
                    setOrderDetails(null)
                    setClicked(false)
                    setOrderFormData({
                      name: '',
                      email: '',
                      phone: '',
                      option: '',
                      date: ''
                    })
                  }
                }
              >Delete</button>
            </div>

            <div className='mt-5 sm:mt-2' style={{ height: 350 }}>
              <h1
                style={{ fontFamily: 'poppins', fontWeight: 600 }}
                className='p-2 ps-3 text-white bg-black'
              >
                <span style={{ color: '#b80101' }}>M</span>y{' '}
                <span style={{ color: '#b80101' }}>B</span>AG
              </h1>

              <div className='p-3'>
                {/* Display Total Selected Items */}
                <div className='d-flex justify-content-between'>
                  <h4>Total Selected Items:</h4>
                  <h4> {totalSelectedItems}</h4>
                </div>
                <div className='d-flex justify-content-between'>
                  <h4>Subtotal</h4>
                  <h4>Rs. {total}</h4>
                </div>
                <div className='d-flex justify-content-between'>
                  <h4>
                    Tax{' '}
                    <span
                      className='ms-1 text-secondary align-middle'
                      style={{ fontSize: '0.6rem' }}
                    >
                      (CGST - 2%)
                    </span>
                  </h4>
                  <h4>Rs. {(total * 0.02 * totalSelectedItems).toFixed(2)}</h4>
                </div>
                <div className='d-flex justify-content-between'>
                  <h4>Total</h4>
                  <h4>
                    Rs. {Math.floor(total + total * 0.02 * totalSelectedItems)}
                  </h4>
                </div>
                <div className='d-flex justify-content-between mt-2'>
                  <h5>Discount :</h5>
                  <h5>
                    {(
                      total +
                      total * 0.02 * totalSelectedItems -
                      Math.floor(total + total * 0.02 * totalSelectedItems)
                    ).toFixed(1)}
                  </h5>
                </div>

                <div className='d-flex justify-content-center'>
                  <button
                    className='btn btn-success mt-3'
                    style={{ fontWeight: 600 }}
                    onClick={checkOut}
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderNow
