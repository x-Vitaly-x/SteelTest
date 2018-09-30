Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #
  root to: 'home#index'

  resources :products
  namespace :api do
    namespace :v1 do
      namespace :products do
        resources :csv_uploads
      end
      resources :products
    end
  end
end
