const productDao = require("../models/productDao");

const getAllProductList = async (optionsInfo) => {
  let result;
  if (optionsInfo.sort == 0) {
    // ##### step 1-1 :정렬 안한다!  
    // ==> 가격필터는 min_price & max_price 무조건 양쪽 다 있어야 한다 가정하기

    if (optionsInfo.min_price && (optionsInfo.size == 0)) {
      // 가격필터 있고 사이즈 없고
      // 가격 필터 걸어서 전체상품 가져오기
      console.log('정렬 X 가격필터 O 사이즈 X')
      result = await productDao.getAllProductsWithPriceFilter(optionsInfo);

    } else if (optionsInfo.min_price && (optionsInfo.size != 0)) {
      // 가격필터 있고 사이즈 있고
      // 가격필터 + 사이즈필터 걸어서 전체 상품 가져오기
      console.log('정렬 X 가격필터 O 사이즈 O')
      result = await productDao.getAllProductsWithPriceAndSizeFilter(optionsInfo);

    } else if (!optionsInfo.min_price && (optionsInfo.size != 0)) {
      // 가격필터 없고 사이즈 있고
      console.log('가격필터 X 사이즈 O')
      result = await productDao.getAllProductsWithSizeFilter(optionsInfo);

    } else { 
      // 가격필터 없고 사이즈 없고
      console.log('정렬 X 가격필터 X 사이즈 X => 그냥 전체 상품 보내주기')
      result = productDao.getAllProducts(optionsInfo)
    }

  } else {
    // ##### step 1-2 :정렬 한다!
    if (optionsInfo.min_price && (optionsInfo.size == 0)) {
      // 가격필터 있고 사이즈 없고
      console.log('정렬 O 가격필터 O 사이즈 X')
      result = await productDao.getSortedProductsWithPrice(optionsInfo);

    } else if (optionsInfo.min_price && (optionsInfo.size != 0)) {
      // 가격필터 있고 사이즈 있고
      console.log('정렬 O 가격필터 O 사이즈 O')
      result = await productDao.getSortedProductsWithPriceAndSizeFilter(optionsInfo);

    } else if (!optionsInfo.min_price && (optionsInfo.size != 0)) {
      // 가격필터 없고 사이즈 있고
      console.log('정렬 O 가격필터 X 사이즈 O')
      result = await productDao.getSortedProductsWithSizeFilter(optionsInfo);

    } else { 
      // 가격필터 없고 사이즈 없고
      console.log('정렬 O 가격필터 X 사이즈 X')
      result = await productDao.getSortedProducts(optionsInfo);
    }
  }
  return result;
};

const getProductById = async (productId) => {
  const result = await productDao.getProductById(productId);
  if (result.length === 0) {
    throw { status: 404, message: "PRODUCT_DOES_NOT_EXIST" };
  } else {
    return result;
  }
};

module.exports = {
  getAllProductList,
  getProductById,
}
