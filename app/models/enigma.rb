class Enigma < ApplicationRecord
  has_many :answers, dependent: :destroy
  has_many :chats, dependent: :destroy
  has_many :tiles, dependent: :destroy
end
