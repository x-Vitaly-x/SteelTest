require 'test_helper'

class Api::V1::ProductsControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'should be able to fetch all products initially' do
    @user = users(:sample_user_1)
    sign_in @user

    get api_v1_products_path

    assert_equal JSON.parse(@response.body).length, Product.count
  end

  test 'should should be able to delete products' do
    @user = users(:sample_user_1)
    sign_in @user
    assert_difference('Product.count', -1) do
      delete api_v1_product_path(Product.first)
    end
  end
end
