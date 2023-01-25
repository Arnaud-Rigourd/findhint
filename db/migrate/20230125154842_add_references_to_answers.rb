class AddReferencesToAnswers < ActiveRecord::Migration[7.0]
  def change
    add_reference :answers, :enigma, null: false, foreign_key: true
  end
end
