import { useState, useEffect } from 'react'
import './App.css';
import logo from './assets/logo.png'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/products')
      setProducts(res.data.data)
    } catch(error) {
      console.log(error)
    }
  }

  const addProduct = async () => {
    try {
      // Test
      const newProduct = {
        name: 'Product 1',
        imageURL: 'https://m.media-amazon.com/images/I/512sO2L0k6L._AC_UY218_.jpg',
        actualPrice: 3449.00,
        mrp: 3599.00,
        rating: 5
      }
      await axios.post('http://localhost:4000/products', newProduct)
      fetchProducts()
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="App text-blue-950">
      {/*  NAVBAR */ }
      <div className='navbar flex bg-[#E9F1FA] text-2xl px-6 py-4 justify-between'>
        <div>
          <span className='px-2 text-3xl font-semibold'>
            EasyShop
          </span>
          <span className='px-2'>About</span>
          <span className='px-2'>Contact</span>
        </div>
        <div>
          <span className='px-2'>Sign Up</span>
          <span className='px-2'>Login</span>
        </div>
      </div>
      {/* MAIN */ }
      <div className='flex justify-center items-center text-8xl py-6'>
        <img src={logo} alt='Logo' className='w-24 h-24 pe-2' />
        <h1>Welcome to EasyShop</h1>
      </div>
      <button className='px-4 py-2 me-2 text-lg bg-[#198754] rounded-lg' onClick={addProduct}>Add new product</button>
      {/* PRODUCTS */ }
       <div className='flex flex-wrap justify-evenly items-center mt-2'>
        {products.map(product => (
          <div className='product-card flex flex-col justify-center items-center w-[400px] text-center p-5 mt-2 rounded-lg' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} key={product._id}>
            <img src={product.imageURL} alt='product' className='w-[200px]'/>
            <div className='font-semibold text-base'>
              {product.name}
            </div>
            <div>
              {[...Array(product.rating)].map((rating, index) => (
                <span key={index}>⭐</span>
              ))}
            </div>
            <div>
              <span className='pt-2 text-2xl'>₹{product.actualPrice}</span> <span>MRP:<s>₹{product.mrp}</s></span>
            </div>
            <div>
              <button className='px-4 py-2 me-2 text-lg bg-[#FFC107] rounded-lg'>Edit</button>
              <button className='px-4 py-2 text-lg bg-[#DC3545] rounded-lg'>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
