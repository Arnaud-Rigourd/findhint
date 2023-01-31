class AddColumnToTiles < ActiveRecord::Migration[7.0]
  def change
    add_reference :tiles, :enigma, null: false, foreign_key: true
  end
end
