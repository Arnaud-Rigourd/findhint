class CreateChats < ActiveRecord::Migration[7.0]
  def change
    create_table :chats do |t|
      t.text :content
      t.references :enigma, null: false, foreign_key: true

      t.timestamps
    end
  end
end
