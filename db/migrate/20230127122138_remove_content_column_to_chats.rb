class RemoveContentColumnToChats < ActiveRecord::Migration[7.0]
  def change
    remove_column :chats, :content, :text
    add_column :chats, :content, :string
  end
end
