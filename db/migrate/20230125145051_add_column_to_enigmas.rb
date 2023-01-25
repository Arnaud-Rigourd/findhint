class AddColumnToEnigmas < ActiveRecord::Migration[7.0]
  def change
    add_column :enigmas, :origin, :string
  end
end
