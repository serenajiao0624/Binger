import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct, updateProduct, deleteProduct } from '../../store/products';

class ProductForm extends Component {
    constructor({ product }) {
        super();
        this.state = {
            name: product.id ? product.name : '',
            category: product.id ? product.category : '',
            price: product.id ? product.price : 0,
            description: product.id ? product.description : '',
            ImgUrl: product.id ? product.ImgUrl : '',
        }
        this.onChange = this.onChange.bind(this);
        this.handleDestroy = this.handleDestroy.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleDestroy() {
        const { product, history } = this.props;
        this.props.removeProduct(product.id);
        history.push('/admin/products');
    }
    handleSubmit(e) {
        // need to add error message that all fields need to be filled out before submitting (i.e. should not be bale to submit incomplete form)
        // also product name, needs to be unique (can't add multiples of same products)
        e.preventDefault();
        const { product, history } = this.props;
        if (product.id) {
            this.props.editProduct({ ...this.state, id: product.id });
            history.push('/admin/products');
        } else {
            this.props.addProduct({ ...this.state });
            history.push('/admin/products')
        }
    }
    render() {
        const { name, category, price, description, ImgUrl } = this.state;
        const { product } = this.props;
        return (
            <div id='update-form-shell'>
                <h2>
                    { product.id ?
                        `Edit ${product.name}` : 'Add New Product'
                    }
                </h2>
                
                <form id='update-form-body' onSubmit={(e) => this.handleSubmit(e)}>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' name='name' onChange={(e) => this.onChange(e)} value={name} />
                    
                    <label htmlFor='category'>Category: </label>
                    <input type='text' name='category' onChange={(e) => this.onChange(e)} value={category} />

                    <label htmlFor='price'>Price: </label>
                    <input type='number' name='price' onChange={(e) => this.onChange(e)} value={price} />

                    <label htmlFor='description'>Decription: </label>
                    <textarea className='input-description' name='description' onChange={(e) => this.onChange(e)} value={description} />

                    <label htmlFor='ImgUrl'>Image URL: </label>
                    <input type='text' name='ImgUrl' onChange={(e) => this.onChange(e)} value={ImgUrl} />

                    <div id='productForm-buttons'>
                        <button type='submit' className='button-submit'>{ product.id ? 'Update ' : 'Create ' }</button>

                        { !!product.id &&
                            <button type='button' className='button-delete' onClick={() => this.handleDestroy()}>{`Delete`}</button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ products }, ownProps) => {
    return {
        product: products.products.find(product => product.id === ownProps.match.params.id * 1) || {}
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product) => dispatch(createProduct(product)),
        editProduct: (product) => dispatch(updateProduct(product)),
        removeProduct: (id) => dispatch(deleteProduct(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);