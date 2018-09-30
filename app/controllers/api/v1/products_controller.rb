class Api::V1::ProductsController < ApplicationController
  before_action :authenticate_user!

  def index
    @products = Product.all.order(part_number: :asc)
    render("api/v1/products/index", formats: :json)
  end
end
