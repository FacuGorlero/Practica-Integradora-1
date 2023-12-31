const {ObjectId} = require('bson');
const {productModel} = require('./Models/products.model.js');   

class ProductDaoMongo {
    constructor(){
        this.model = productModel;
    }
   getProducts = async () =>{
    try {
        return await this.model.find().lean();
    } catch (error) {
        console.log(error);
    }
   } ;

   getProductsById = async (pid) =>{
    try {
        return await this.model.find({_id:pid});
    } catch (error) {
        console.log(error);
    }
   };

   addProduct = async ({ title, description, code, price, stock, status = true, category, thumbnail}) => {
    try {
    if ( !title || !description || !code || !price || !stock || !status || !category || !thumbnail) {
        if (!title) return 'ERROR: debe completar el titulo';
        if (!description) return 'ERROR: debe completar la descripción';
        if (!code) return 'ERROR: debe completar el Código';
        if (!price) return 'ERROR: debe completar el Precio';
        if (!stock) return 'ERROR: debe completar el Stock';
        if (!status) return 'ERROR: debe completar el Estado';
        if (!category) return 'ERROR: debe completar la Categoria';
        if (!thumbnail) return 'ERROR: debe completar la Imagen';
        return 'ERROR: debe completar todos los campos';
      }

      const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnail: thumbnail,
      };

      return await this.model.create(newProduct)
    }catch (error) {
        console.log(error);
    }
   };

   updateProduct = async (pid, changedProduct) =>{
    try{
        return await this.model.updateOne({_id: new ObjectId(pid)}, changedProduct)
    }catch(error){
        console.log(error);
    }
   };

   deleteProductById = async (pid) => {
    try{
        return await this.model.deleteOne({_id: new ObjectId(pid)})
    }catch{
        console.log(error);
    }
   };
   deleteProductByCode = async(pcode) =>{
    try{
        return await this.model.deleteOne({ code: pcode})
    }catch{
        console.log(error);
    }
   };

}

exports.ProductMongo = ProductDaoMongo;