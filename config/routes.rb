Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'enigmas#index'

  resources :enigmas, only: [:index, :create] do
    get :second, to: 'enigmas#second'
    get :final, to: 'enigmas#final'
    get :firsthint, to: 'enigmas#firsthint'
    resources :answers, only: [:create] do
      collection do
        get :first, to: 'answers#first'
      end
    end
    resources :chats, only: [:create] do
      collection do
        get :welldone, to: 'chats#welldone'
      end
    end
  end
end
