Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "enigmas#index"

  resources :enigmas, only: [:new, :create] do
    collection do
      get :second, to: "enigmas#second"
    end
  end
end
