class Enigma < ApplicationRecord
  has_many :answers, dependent: :destroy
end
