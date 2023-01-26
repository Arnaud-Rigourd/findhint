class AddColumnToChats < ActiveRecord::Migration[7.0]
  def change
    add_column :chats, :origin, :boolean, default: true
  end
end
