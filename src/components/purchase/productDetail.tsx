import { motion } from "framer-motion";
import type { ProductCart } from "../../types";
import Image from "../common/ui/image";

interface ProductsDetailProps {
  index: number
  product: ProductCart;
}

export default function ProductDetail({index, product}: ProductsDetailProps){
  return(
    <motion.div className="w-[90%] flex justify-between items-center my-2 mx-auto border-b-1 p-2 md:w-[50%]"
      key={product.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ delay: index * 0.1 }}
    >
      <div className="flex justify-around items-center ">
        <Image src={product.images? product.images[0].url : " " } alt={`imagen de ${product.name}`} styles="w-16 h-16 object-cover rounded-lg" />
        {/*
        <img
          src={product.images? product.images[0].url : " " }
          alt="Product"
          className="w-16 h-16 object-cover rounded-lg"
        />
        */}
        <div className="flex-1 ms-2">
          <h4 className="font-medium text-gray-900">{product.name}</h4>
          <p className="mt-2 text-cyan-600 font-semibold text-lg">${product.price}</p>
        </div>
      </div>

      <div className="flex justify-around items-center  ">
        <div className="flex flex-col justify-center items-center space-y-1 ">
          <div className="flex justify-center items-center space-x-2 rounded-lg">

            <div className="flex justify-center items-center space-x-1 rounded-lg">
              <p>Cantidad: </p>
              {" "}
              <span className="px-2">{product.quantity}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}