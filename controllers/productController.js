const productService = require("../services/productService");

const getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAllProductList();
        return res.status(200).json({ "result" : result })

    } catch (e) {
        console.log(e);
        return res.status(e.status || 500).json({ message : e.message || "SERVER_ERROR"});
    }
}

module.exports = {
    getAllProducts
}