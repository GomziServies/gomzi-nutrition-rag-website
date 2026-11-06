function CartSection() {
  const cart = [];

  // useEffect(() => {
  //   loadCart();
  // }, []);

  // const loadCart = async () => {
  //   try {
  //     // const response = await getCartApi();
  //     // setCart(response.data.data);

  //     setCart([]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 text-gray-500">Cart is empty</div>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>Cart Item</div>
          ))}
        </div>
      )}
    </>
  );
}

export default CartSection;
