class HomeController < ApplicationController

  def index
    if current_user
      redirect_to products_path
    end
  end
end
