Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'enigmas#index'

  resources :enigmas, only: [:new, :create] do
    get :second, to: 'enigmas#second'
    collection do
      get :welldone, to: 'enigmas#welldone'
    end
    resources :answers, only: [:create] do
      collection do
        get :first, to: 'answers#first'
        get :welldone, to: 'answers#welldone'
      end
    end
  end
end
