class CreateEnigmas < ActiveRecord::Migration[7.0]
  def change
    create_table :enigmas do |t|
      t.text :answer

      t.timestamps
    end
  end
end
